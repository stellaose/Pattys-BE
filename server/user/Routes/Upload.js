import  { Router } from 'express';
import auth from '../Middleware/Auth.js';
import ImageUpload from '../Middleware/ImageUpload.js';
import UploadController from '../Controller/UploadController.js';

const router = Router();

router.post('/avatar_upload', ImageUpload, auth, UploadController.uploadAvatar);

export default router;