import { Router } from 'express';
import UserController from '../Controller/UserController.js';
import auth from '../Middleware/Auth.js';
import authAdmin from '../Middleware/AuthAdmin.js';

const router = Router();

router.post('/register', UserController.register);
router.post('/activate', UserController.activateEmail);
router.post('/login', UserController.login);
router.post('/refresh_token', UserController.getAccessToken);
router.post('/forget-password', UserController.forgetPassword);
router.put('/reset-password', auth, UserController.resetPassword);
router.get('/user-info', auth, UserController.getUserInfo);
router.get('/all-user', auth, authAdmin, UserController.getUserAllInfo);
router.put('/update', auth, UserController.updateUser);
router.put('/update_role/:id', auth, authAdmin, UserController.updateUserRole);
router.delete('/delete/:id', auth, authAdmin, UserController.deleteUser);
router.get('/logout', UserController.logout);



export default router;