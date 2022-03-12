import ErrorResponse from '../Utils/ErrorHandler.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const UploadController = {
    uploadAvatar: (req, res, next) => {
        try{
            const file = req.files.file;

            cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: 'avatar',
                width: 180,
                height: 180,
                crop: 'fill'
            }, async (err, result) => {
                if(err) throw err

                removeTmp(file.tempFilePath);

                res.json({
                    url: result.secure_url
                })
            })
        } catch(err){
            console.log(err)
            return next
                (new ErrorResponse ('Server error', 500))
        }
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    });
}

export default UploadController;