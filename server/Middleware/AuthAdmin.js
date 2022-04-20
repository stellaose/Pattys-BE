import ErrorResponse from '../Utils/ErrorHandler.js';

const AuthAdmin =  (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.savedUser.role)) {
        return next(
          new ErrorResponse(
            `Role: ${req.savedUser.role} is not allowed to access this resource `,
            403
          )
        );
      }
  
    next();
    }
}

export default AuthAdmin;