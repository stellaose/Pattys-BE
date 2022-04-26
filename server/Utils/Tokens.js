import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const createActivationToken = (savedUser) => {
    return jwt.sign({ id: savedUser._id }, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '1h'})
}

export const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '45m'})
}

export const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '2d'})
}

export const generateToken = (savedUser) => {
        return jwt.sign({
            id: savedUser._id,
            firstname: savedUser.firstname,
            lastname: savedUser.lastname,
            username: savedUser.username,
            email: savedUser.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '1d'
        }
        )
    }
    