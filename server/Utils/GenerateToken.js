import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '15m'})
}

export const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '45m'})
}

export const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '2d'})
}

// export const generateToken = (user, statusCode, res, token) => {
//     // Options for cookie
//     const options = {
//         expires: new Date(
//             Date.now() + process.env.COOKIE_EXPIRY_TIME * 24 * 60 * 60 * 1000
//         ),
//         httpOnly: true
//     }


//     res.status(statusCode).cookie('token', token, options).json({
//         success: true,
//         token,
//         user
//     })

// }


export const generateToken = (user) => {
    return jwt.sign({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: '2d'
    }
    )
}
