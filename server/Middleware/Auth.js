import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import ErrorResponse from "../Utils/ErrorHandler.js";


dotenv.config({ quiet: true });

export const Auth = async (req, res, next) => {
try {
    const bearerTokenFromHeader = req.header('Authorization');

    if (!bearerTokenFromHeader) {
      return next(new ErrorResponse("Unauthorized", 401));
    }

    const token = bearerTokenFromHeader.replace('Bearer ', '');
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return next(new ErrorResponse("Invalid token", 401));
      }
      req.userId = decoded.userid;
      next();
    });
  } catch (error) {
    console.error(error);
    next(new ErrorResponse("Internal server error", 500));
  }
};

export const AuthAdmin = async (req, res, next) => {
  try {
    const bearerTokenFromHeader = req.header('Authorization');

    if (!bearerTokenFromHeader) {
      return next(new ErrorResponse("Unauthorized", 401));
    }

    const token = bearerTokenFromHeader.replace('Bearer ', '');
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return next(new ErrorResponse("Invalid token", 401));
      }
      req.adminId = decoded.adminid;
      next();
    });
  } catch (error) {
    console.error(error);
    return next(new ErrorResponse("Internal server error", 500));
  }
  
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
