import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../Models/UserModel.js';
import sendMail from '../Utils/SendMail.js';
import sendMailer from '../Utils/Mailer.js';
import validateEmail from '../Utils/ValidateEmail.js';
import validatePassword from '../Utils/ValidatePassword.js';
import { createActivationToken, createAccessToken, createRefreshToken } from '../Utils/GenerateToken.js'

dotenv.config();
const { CLIENT_URL} = process.env

const UserController = {
    register: async (req, res) => {
        try{
            const { firstname, lastname, email, password, confirmPassword } = req.body;

            if(!firstname || !lastname || !email || !password || !confirmPassword ){
                return res.json({
                    status: 400,
                    message: "Please fill all fields"
                })
            }
            if(!validateEmail(email)){
                return res.json({
                    status: 400,
                    message: "Please enter a valid email"
                })
            }
            if(!validatePassword(password)){
                return res.json({
                            status: 400,
                            message: "Please enter a valid password"
                        })
            }
            if(password.length < 7){
                return res.json({
                            status: 400,
                            message: "Password must not be less than 7 characters"
                        })
            }
            if(password !== confirmPassword){
                return res.json({
                            status: 400,
                            message: "Password mismatch. Please try again"
                        })
            }

            const findUser = await User.findOne({email})

            if(findUser){
                return res.json({
                        status: 400,
                        message: "This email exist already Please log in now"
                    })
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password,  salt);
            const hashedPassword = bcrypt.hashSync(confirmPassword,  salt);


                const newUser = { 
                                    firstname, 
                                    lastname, 
                                    email, 
                                    password: hashPassword, 
                                    confirmPassword: hashedPassword
                                    };

            const activation_token = createActivationToken(newUser);

            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, "Verify your email address");
            
            res.json({message: 'Register success!!! Please activate your email to start'})
        } 
        catch(err) {
            console.log(err);
            return res.json({
                        status: 500,
                        message: "Server error"
                    })
        }
    },

    activateEmail: async(req, res) => {
        try{
            const { activation_token } = req.body;
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET);

            const { firstname, lastname, email, password, confirmPassword} = user;

            const check = await User.findOne({email});
            if(check){
                return res.json({
                    status: 400,
                    message: "This email already exist. Please log in"
                })
            }
            const newUser = new User({
                firstname, lastname, email, password, confirmPassword
            });

            await newUser.save();
            res.json({
                status: 200,
                message: 'This email has been activated successfully'
            })
        }
        catch(err) {
            console.log(err);
            return res.json({
                        status: 500,
                        message: "Server error"
                    })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            
            if(!email || !password) {
                return res
                            .json({
                                status: 400,
                                message: "All fields must be provided"
                            })
            }
           
            const user = await User.findOne({ email })
          
            if(!user) {
                return res.json({
                    status: 400,
                    message: "This email does not exist. Please sign up"
                })
            }
            const match = await bcrypt.compare(password, user.password);

            if(match){
                return res.json({
                    status: 200,
                    message: "Login successful",
                    _id: user._id,
                    firstname: user.firstname,
                    avatar: user.avatar
                })
            }

            if (!match) {
                return res.json({
                    status: 400,
                    message: "Password is incorrect"
                })
            }

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({
                status: 200,
                message: "Login success!"})
        }
        catch(err) {
            console.log(err);
            return res.json({
                        status: 500,
                        message: "Server error"
                    })
        }
    },

    getAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;

            if(!rf_token){
                return res.json({
                    status: 400,
                    message: "You are not logged in. Please log in now"
                })
            }

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err){
                    return res.json({
                                    status: 400,
                                    message: "You are not logged in. Please log in now"
                                })
                }

                const access_token = createAccessToken({id: user.id});

                res.json({
                        status: 200,
                        access_token
                    });
            })
        }
        catch(err) {
            console.log(err);
            return res.json({
                status: 500,
                message: "Server error"
            })
        }
    },

    forgetPassword: async (req, res) => {
        try{
            const {email} = req.body;
            const user = await User.findOne({email});
            if(!user){
                return res.json({
                    status: 400,
                    message: "This email does not exist"
                })
            }

            const access_token = createAccessToken({id: user._id});
            const url = `${CLIENT_URL}/user/reset/${access_token}`

            sendMailer(email, url, "Reset your password");
            res.json({
                status: 200,
                message: "To create a new password, please check your email."
            })
        }
        catch(err) {
            console.log(err);
            return res.json({
                        status: 500,
                        message: "Server error"
                    })
        }
    },

    resetPassword: async (req, res) => {
        try {
            const { password, confirmPassword } = req.body;

            const salt = bcrypt.genSaltSync(12);
            const hashPassword = bcrypt.hashSync(password, salt);
            const hashedPassword = bcrypt.hashSync(confirmPassword, salt);


            await User.findOneAndUpdate({_id: req.user.id}, { 
                password: hashPassword,
                confirmPassword: hashedPassword
            })
            res.json({
                status: 200,
                message: 'Password has been changed successfully'
            })
        } 
        catch (err) {
            console.log(err);
            return res.json({
                        status: 500,
                        message: "Server error"
                    })
        }
    },

    getUserInfo: async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id)
                                    .select('-password')
                                    .select('-confirmPassword')
                                    .exec();

            res.json(user)
        } 
        catch (err) {
            console.log(err);
            return res.json({
                status: 500,
                message: "Server error"
            })
        }
    },

    getUserAllInfo: async (req, res) => {
        try {
            const user = await User.find()
                                    .select('-password')
                                    .select('-confirmPassword')
                                    .exec()
            res.json(user)
        } catch (err) {
            console.log(err);
            return res.json({
                        status: 500,
                        message: "Server error"
                    })          
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {firstname, lastname, email, avatar} = req.body;

            await User.findOneAndUpdate({_id: req.user.id}, {
                firstname, 
                lastname,
                email, 
                avatar
            })
                
            res.json({
                status: 200,
                message: "Updated Successfully"
            })
        } catch (err) {
            console.log(err);
            return next 
                (new ErrorResponse('Server error', 500))
        }
    },

    updateUserRole: async (req, res, next) => {
        try {
            const { role } = req.body;

            await User.findOneAndUpdate({_id: req.params.id}, {
                role
            })

            res.json({
                status: 200,
                message: "Updated Successfully"
            })
        } catch (err) {
            console.log(err);
            return next
                (new ErrorResponse('Server error', 500))
        }
    },

    logout: async (req, res, next) => {
        try {
            res.clearCookie('refreshtoken', {
                path: '/user/refresh_token',
            })

            res.json({
                status: 200,
                message: 'Logged out successfully'
            })
        } catch (err) {
            console.log(err);
            return res.json({
                        status: 500,
                        message: "Server error"
                    })
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await User.findByIdAndDelete(req.params.id);

            res.json({
                status: 200,
                message: 'Deleted successfully'
            })
        } catch (err) {
            console.log(err);
            return res.json({
                        status: 500,
                        message: "Server error"
                    })
        }
    }
}

export default UserController;