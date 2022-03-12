import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileupload from 'express-fileupload';

import UserRoute from './Routes/UserRoute.js';
import UploadRoute from './Routes/Upload.js';

const app = express();

app.use(cookieParser());
app.use(fileupload({
    useTempFiles: true
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.json({
        status: 'Success',
        message: 'Hello world'
    });
});

app.use('/user', UserRoute);
app.use('/api', UploadRoute);

export default app;
