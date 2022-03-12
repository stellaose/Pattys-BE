import mongoose from 'mongoose';
import validator from 'validator';

const { Schema, model } = mongoose;
const { isEmail } = validator

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            trim: true,
            required: [true, 'Please enter your name']
        },
        lastname: {
            type: String,
            trim: true,
            required: [true, 'Please enter your name']
        },
        email: {
            type: String,
            trim: true,
            required: true,
            lowercase: true,
            unique: true,
            validate: [isEmail, 'Please enter your email']
        },
        password: {
            type: String,
            required: [true, 'Please enter your password']
        },
        confirmPassword: {
            type: String,
            required: [true, 'Please enter your password']
        },
        role: {
            type: Number,
            default: 0 // 0 = user, 1 = admin
        },
        avatar: {
            type: String,
            default: 'https://res.cloudinary.com/stellaose/image/upload/v1646934366/user-3297_vxpaxr.svg'
        }
    },
        {timestamps: true}
)

export const User = model('user', userSchema);