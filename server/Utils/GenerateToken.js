import dotenv from "dotenv";

dotenv.config({ quiet: true });

const GenerateToken = (user, statusCode, res, token, message) => {
  //+ Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRY_TIME * 24 * 60 * 60 * 10
    ),
    httpOnly: true,
  };

  return res.status(statusCode).cookie("token", token, options).json({
    status: statusCode,
    message,
    success: true,
    token,
    details: user,
  });
};

export default GenerateToken;
