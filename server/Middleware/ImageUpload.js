import fs from 'fs';
 import ErrorResponse from '../Utils/ErrorHandler.js';

const imageUpload = async (req, res, next ) => {
    try{
        if(!req.files || Object.keys(req.files).length === 0){
            return next
                (new ErrorResponse('No file was uploaded', 400))
        }
        const file = req.files.file;

        console.log(file);
        
        if (file.size > 1024 * 1024){
            removeTmp(file.tempFilePath)
            return next
                (new ErrorResponse ('Size too large', 400))
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg'){
            removeTmp(file.tempFilePath)
            return next
                (new ErrorResponse ('File format is incorrect', 400))
        }
        next()
    } catch(err){
        console.log(err)
        return next 
            (new ErrorResponse('Server error', 500))
    }
}

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err
    });
}

export default imageUpload;