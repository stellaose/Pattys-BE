import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import ErrorResponse from '../Utils/ErrorHandler.js';
import { User } from '../Models/UserModel.js';

dotenv.config()

export const Auth = async (req, res, next) => {
    const { token } = req.cookies;

    if(!token){
        return next
            (new ErrorResponse('Invalid Authentication token', 400));
    }
        
    const decodedData = jwt.verify(token, process.env.SECRET);
        
    req.savedUser = await User.findById(decodedData.userid);
        
    next();
}

export const AllowedRoles = (...roles) => {

    return (req,res,next) => {

        const {savedUser} = req;

        if(!roles.includes(savedUser.role)){
            return next
                (new ErrorResponse(`Role ${savedUser.role} is not allowed to access this resource`,401));
        }

        next();
    }
}