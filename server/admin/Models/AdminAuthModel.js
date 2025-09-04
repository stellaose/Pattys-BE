import mongoose from "mongoose";
import validator from "validator";

const { Schema, model } = mongoose;
const { isEmail } = validator;

const adminAuthSchema = new Schema(
  {
    adminId:String,
    firstname: {
      type: String,
      trim: true,
      required: [true, "Please enter your name"],
    },
    lastname: {
      type: String,
      trim: true,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      trim: true,
      required: true,
      lowercase: true,
      unique: true,
      validate: [isEmail, "Please enter your email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [false, "Please enter your password"],
    },
    role: {
      type: String,
      required: true,
      lowercase: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const AdminAuth = model("AdminAuth", adminAuthSchema);
