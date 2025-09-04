import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import ErrorResponse from "../Utils/ErrorHandler.js";
import { User } from "../user/Models/UserModel.js";
import { AdminAuth } from "../admin/Models/AdminAuthModel.js";

dotenv.config({ quiet: true });

export const Auth = async (req, res, next) => {
  const bearerTokenFromHeader = req.headers.authorization;

  if (!bearerTokenFromHeader) {
    return next(new ErrorResponse("Please login to access this resource", 400));
  }

  const decodedData = jwt.verify(bearerTokenFromHeader, process.env.SECRET);

  req.savedUser = await User.findById(decodedData.userid);

  next();
};

export const AuthAdmin = async (req, res, next) => {
  const bearerTokenFromHeader = req.headers.authorization;

  if (!bearerTokenFromHeader) {
    return next(new ErrorResponse("Please login to access this resource", 400));
  }

  const decodedData = jwt.verify(bearerTokenFromHeader, process.env.SECRET);

  req.savedUser = await AdminAuth.findById(decodedData.adminId);

  next();
};

export const AllowedRoles = (...roles) => {
  return (req, res, next) => {
    const { savedAdmin } = req;

    if (!roles.includes(savedAdmin.role)) {
      return next(
        new ErrorResponse(
          `Role ${savedAdmin.role} is not allowed to access this resource`,
          401
        )
      );
    }

    next();
  };
};
