import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
// import fileupload from 'express-fileupload';
import ErrorMiddleware from "./Middleware/Error.js";

import userRoutes from "./user/Routes/index.js";
import adminRoutes from "./admin/Routes/index.js";

const app = express();

app.use(cookieParser());
// app.use(fileupload());

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // * to handle url encoded data

app.get("/", (req, res) => {
  res.json({
    status: 200,
    success: true,
    message: "Hello world",
  });
});

// * Routes
app.use("/v1/user", userRoutes);
app.use("/v1/admin", adminRoutes);

// + middleware for handling error
app.use(ErrorMiddleware);

export default app;
