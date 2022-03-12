import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
import ErrorResponse from '../Utils/ErrorHandler.js'

dotenv.config()

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')

        if(!token){
            return next
                (new ErrorResponse('Invalid Authentication token', 400))
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err){
                return next
                    (new ErrorResponse('Invalid token', 400))
            }

            req.user = user
            next();
        })
    } catch (err) {
        console.log(err)
        return next
            (new ErrorResponse('Server error', 500))        
    }
}

export default auth;