import dotenv from 'dotenv';

dotenv.config();

const GenerateToken = (savedUser, statusCode, res, token) => {

    //+ Options for cookie
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRY_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }


    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        savedUser
    })

}

export default GenerateToken


// export const generateToken = (user) => {
//     return jwt.sign({
//         id: user._id,
//         firstname: user.firstname,
//         lastname: user.lastname,
//         username: user.username,
//         email: user.email,
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//         expiresIn: '2d'
//     }
//     )
// }
