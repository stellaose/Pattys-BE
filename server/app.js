import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fileupload from 'express-fileupload';
// import path from 'path';
import ErrorMiddleware from './user/Middleware/Error.js';

import userRoutes from './user/Routes/index.js'


const app = express();

app.use(cookieParser());
app.use(fileupload({
    useTempFiles: true
}));


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true})); // * to handle url encoded data


app.get('/', (req, res) => {
    res.json({
        status: 200,
        success: true,
        message: 'Hello world'
    });
});

// * Routes
app.use('/v1/user', userRoutes)

// + middleware for handling error
app.use(ErrorMiddleware);


export default app;