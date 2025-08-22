import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import ErrorResponse from "../../Utils/ErrorHandler.js";
import { User } from "../Models/UserModel.js";

dotenv.config({ quiet: true });

export const Auth = async (req, res, next) => {
  const bearerTokenFromHeader = req.headers.authorization;

  //   const { token } = req.cookies;

  if (!bearerTokenFromHeader) {
    return next(new ErrorResponse("Please login to access this resource", 400));
  }

  const decodedData = jwt.verify(bearerTokenFromHeader, process.env.SECRET);

  req.savedUser = await User.findById(decodedData.userid);

  next();
};

export const AllowedRoles = (...roles) => {
  return (req, res, next) => {
    const { savedUser } = req;

    if (!roles.includes(savedUser.role)) {
      return next(
        new ErrorResponse(
          `Role ${savedUser.role} is not allowed to access this resource`,
          401
        )
      );
    }

    next();
  };
};
