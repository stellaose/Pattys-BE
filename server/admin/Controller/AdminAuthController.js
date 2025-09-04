import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import ErrorResponse from "../../Utils/ErrorHandler.js";
import sendEmail from "../../Utils/SendEmail.js";
import validateEmail from "../../Utils/ValidateEmail.js";
import GenerateToken from "../../Utils/GenerateToken.js";
import { AdminAuth } from "../Models/AdminAuthModel.js";
import { nanoid } from "nanoid";

dotenv.config({ quiet: true });

const AdminAuthController = {
  register: async (req, res, next) => {
    const { firstname, lastname, role, email, password } = req.body;
    try {
      if ((!firstname, !lastname, !email, !password, !role)) {
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

      const findAdmin = await AdminAuth.findOne({ email });

      if (findAdmin) {
        return next(
          new ErrorResponse("This email exist already Please log in now.", 400)
        );
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      if (hashPassword) {
        const savedAdmin = await AdminAuth.create({
          adminId: `admin-${nanoid(24).replaceAll("_", "")}`,
          firstname,
          lastname,
          email,
          role,
          password: hashPassword,
        });

        const payload = { adminId: savedAdmin._id };

        const adminToken = jwt.sign(payload, process.env.SECRET, {
          expiresIn: "7d",
        });
        GenerateToken(
          savedAdmin,
          200,
          res,
          adminToken,
          "Admin created successfully"
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

      const savedAdmin = await AdminAuth.findOne({ email }).select("+password");

      if (!savedAdmin) {
        return next(
          new ErrorResponse("Admin does not exist. Please sign up", 400)
        );
      }

      const match = await bcrypt.compare(password, savedAdmin.password);

      if (!match) {
        return next(new ErrorResponse("Password is incorrect", 400));
      }

      const payload = {
        adminId: savedAdmin._id,
      };
      const authToken = jwt.sign(payload, process.env.SECRET, {
        expiresIn: "7d",
      });

      GenerateToken(savedAdmin, 200, res, authToken, "Login successful");
    } catch (error) {
      return next(error);
    }
  },

  forgetPassword: async (req, res, next) => {
    const { email } = req.body;

    try {
      const savedAdmin = await AdminAuth.findOne({ email });

      if (!savedAdmin) {
        return next(new ErrorResponse("This email does not exist", 401));
      }

      // * Generate token
      const resetToken = crypto.randomBytes(20).toString("hex");

      // + Hash and set to resetPasswordToken
      savedAdmin.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

      // - Set token expire time
      savedAdmin.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

      await savedAdmin.save({ validateBeforeSave: false });

      // ? create password reset url

      const url = `${process.env.ADMIN_CLIENT_URL}/reset-password/${resetToken}`;
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
          message: `Email sent to ${savedAdmin.email}`,
        });
      } catch (error) {
        savedAdmin.resetPasswordToken = undefined;
        savedAdmin.resetPasswordExpire = undefined;

        await savedAdmin.save({ validateBeforeSave: false });
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

      const savedAdmin = await AdminAuth.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });

      if (!savedAdmin) {
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

      savedAdmin.password = hashedPassword;

      savedAdmin.resetPasswordToken = undefined;
      savedAdmin.resetPasswordExpire = undefined;

      await savedAdmin.save();

      const payload = { adminId: savedAdmin._id };
      const authToken = await jwt.sign(payload, process.env.SECRET, {
        expiresIn: "7d",
      });

      GenerateToken(savedAdmin, 200, res, authToken);
    } catch (error) {
      return next(error);
    }
  },

  updatePassword: async (req, res, next) => {
    const { password, newPassword, confirmPassword } = req.body;

    try {
      const savedAdmin = await AdminAuth.findById(req.savedAdmin.id).select(
        "+password"
      );

      const isMatch = await bcrypt.compare(password, savedAdmin.password);

      if (!isMatch) {
        return next(new ErrorResponse("Old password is incorrect", 400));
      }

      if (newPassword !== confirmPassword) {
        return next(new ErrorResponse("password does not match", 400));
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(newPassword, salt);

      savedAdmin.password = hashPassword;

      await savedAdmin.save();

      GenerateToken(savedAdmin, 200, res);
    } catch (error) {
      return next(error);
    }
  },

  SingleUser: async (req, res, next) => {
    try {
      const oneUser = await AdminAuth.findById(req.params.id);

      if (!oneUser) {
        return next(
          new ErrorResponse(
            `AdminAuth with id ${req.params.id} does not exist`,
            400
          )
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
      const allUser = await AdminAuth.find()
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

      const savedAdmin = await AdminAuth.findByIdAndUpdate(
        req.params.id,
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
        message: "AdminAuth role updated successfully",
        savedAdmin,
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
      const oneProfile = await AdminAuth.findByIdAndDelete(req.params.id);

      if (!oneProfile) {
        return next(
          new ErrorResponse(
            `AdminAuth with id ${req.params.id} does not exist`,
            400
          )
        );
      }

      res.json({
        status: 200,
        message: "AdminAuth deleted successfully",
      });
    } catch (err) {
      return next(err);
    }
  },
};

export default AdminAuthController;
