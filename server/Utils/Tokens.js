import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const createActivationToken = () => {
    return jwt.sign({ _id: _id }, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '1h'})
}

export const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '45m'})
}

export const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '2d'})
}