import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { User } from "../Models/UserModel.js";
import ErrorResponse from "../../Utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import sendEmail from "../../Utils/SendEmail.js";
import validateEmail from "../../Utils/ValidateEmail.js";
import validatePassword from "../../Utils/ValidatePassword.js";
import GenerateToken from "../../Utils/GenerateToken.js";

dotenv.config({ quiet: true });

const UserController = {
  register: async (req, res, next) => {
    try {
      const { firstname, lastname, email, password } = req.body;

      if (!firstname || !lastname || !email || !password) {
        return next(new ErrorResponse("Please fill all fields", 400));
      }
      if (!validateEmail(email)) {
        return next(new ErrorResponse("Please enter a valid email", 400));
      }

      if (password.length < 7) {
        return next(
          new ErrorResponse("Password must not be less than 7 characters", 400)
        );
      }

      const findUser = await User.findOne({ email });

      if (findUser) {
        return next(
          new ErrorResponse("This email exist already Please log in now.", 400)
        );
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      if (hashPassword) {
        const savedUser = await User.create({
          firstname,
          lastname,
          email,
          password: hashPassword,
          avatar: {
            public_id: "public_id",
            url: "https://res.cloudinary.com/stellaose/image/upload/v1673976402/avatar_etkgih.png",
          },
        });

        const payload = { userid: savedUser._id };

        const authToken = jwt.sign(payload, process.env.SECRET, {
          expiresIn: "7d",
        });

        GenerateToken(
          savedUser,
          200,
          res,
          authToken,
          "User created successfully"
        );
      }
    } catch (error) {
      return next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorResponse("All fields must be provided", 400));
      }

      const savedUser = await User.findOne({ email }).select("+password");

      if (!savedUser) {
        return next(
          new ErrorResponse("This email does not exist. Please sign up", 400)
        );
      }

      const match = await bcrypt.compare(password, savedUser.password);

      if (!match) {
        return next(new ErrorResponse("Password is incorrect", 400));
      }

      const payload = {
        userid: savedUser._id,
      };
      const authToken = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "7d",
      });

      GenerateToken(savedUser, 200, res, authToken, "Login successful");
    } catch (error) {
      return next(error);
    }
  },

  googleLogin: async (req, res, next) => {},

  forgetPassword: async (req, res, next) => {
    const { email } = req.body;

    try {
      const savedUser = await User.findOne({ email });

      if (!savedUser) {
        return next(new ErrorResponse("This email does not exist", 401));
      }

      // * Generate token
      const resetToken = crypto.randomBytes(20).toString("hex");

      // + Hash and set to resetPasswordToken
      savedUser.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      // - Set token expire time
      savedUser.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

      await savedUser.save({ validateBeforeSave: false });

      // ? create password reset url
      // const url = `${req.protocol}://${process.env.CLIENT_URL}/reset-password/${resetToken}`;

      const url = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
      try {
        await sendEmail(
          email,
          url,
          "Pattys - Password Reset Request",
          "Reset your password"
        );

        res.json({
          status: 200,
          success: true,
          message: `Email sent to ${savedUser.email}`,
        });
      } catch (error) {
        savedUser.resetPasswordToken = undefined;
        savedUser.resetPasswordExpire = undefined;

        await savedUser.save({ validateBeforeSave: false });
        return next(new ErrorResponse(error.message, 500));
      }
    } catch (error) {
      return next(error);
    }
  },

  resetPassword: async (req, res, next) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    try {
      // Hash URL token
      const resetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

      const savedUser = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!savedUser) {
        return next(
          new ErrorResponse(
            "Password reset token is invalid or has expired. Please try again.",
            400
          )
        );
      }

      if (password !== confirmPassword) {
        return next(new ErrorResponse("Passwords do not match.", 400));
      }

      // Setup new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      savedUser.password = hashedPassword;

      savedUser.resetPasswordToken = undefined;
      savedUser.resetPasswordExpire = undefined;

      await savedUser.save();

      const payload = { userid: savedUser._id };
      const authToken = await jwt.sign(payload, process.env.SECRET, {
        expiresIn: "7d",
      });

      GenerateToken(savedUser, 200, res, authToken);
    } catch (error) {
      return next(error);
    }
  },

  updatePassword: async (req, res, next) => {
    const { password, newPassword, confirmPassword } = req.body;

    try {
      const savedUser = await User.findById(req.savedUser.id).select(
        "+password"
      );

      const isMatch = await bcrypt.compare(password, savedUser.password);

      if (!isMatch) {
        return next(new ErrorResponse("Old password is incorrect", 400));
      }

      if (newPassword !== confirmPassword) {
        return next(new ErrorResponse("password does not match", 400));
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(newPassword, salt);

      savedUser.password = hashPassword;

      await savedUser.save();

      GenerateToken(savedUser, 200, res);
    } catch (error) {
      return next(error);
    }
  },

  updateUser: async (req, res, next) => {
    const { firstname, lastname, email } = req.body;

    try {
      const newUser = {
        firstname,
        lastname,
        email,
      };

      if (req.body.avatar !== "") {
        const savedUser = await User.findById(req.savedUser.id);

        const imageId = savedUser.avatar[0].public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatar",
          quality: 60,
          width: "auto",
          crop: "scale",
        });

        newUser.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const savedUser = await User.findByIdAndUpdate(
        req.savedUser.id,
        newUser,
        {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        }
      );

      res.json({
        status: 200,
        success: true,
        message: "Profile updated successfully",
        savedUser,
      });
    } catch (err) {
      return next(err);
    }
  },

  UserInfo: async (req, res, next) => {
    try {
      const thisUser = await User.findById(req.savedUser.id);

      res.json({
        status: 200,
        success: true,
        thisUser,
      });
    } catch (error) {
      return next(error);
    }
  },

  SingleUser: async (req, res, next) => {
    try {
      const oneUser = await User.findById(req.params.id);

      if (!oneUser) {
        return next(
          new ErrorResponse(`User with id ${req.params.id} does not exist`, 400)
        );
      }

      return res.json({
        status: 200,
        success: true,
        oneUser,
      });
    } catch (err) {
      return next(err);
    }
  },

  AllUserInfo: async (req, res, next) => {
    try {
      const allUser = await User.find()
        .select("-password")
        .select("-confirmPassword")
        .exec();
      res.json({
        status: 200,
        success: true,
        allUser,
      });
    } catch (err) {
      return next(err);
    }
  },

  updateUserRole: async (req, res, next) => {
    const { firstname, lastname, email, role } = req.body;

    try {
      const newUser = {
        firstname,
        lastname,
        email,
        role,
      };

      const savedUser = await User.findByIdAndUpdate(req.params.id, newUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });

      res.json({
        status: 200,
        success: true,
        message: "User role updated successfully",
        savedUser,
      });
    } catch (err) {
      return next(err);
    }
  },

  logout: async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.json({
        status: 200,
        message: "Logged out successfully",
      });
    } catch (err) {
      return next(err);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const oneProfile = await User.findByIdAndDelete(req.params.id);

      if (!oneProfile) {
        return next(
          new ErrorResponse(`User with id ${req.params.id} does not exist`, 400)
        );
      }

      res.json({
        status: 200,
        message: "User deleted successfully",
      });
    } catch (err) {
      return next(err);
    }
  },
};

export default UserController;
