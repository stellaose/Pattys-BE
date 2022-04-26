import { Router } from 'express';
import UserController from '../Controller/UserController.js';
import { Auth, AllowedRoles }  from '../Middleware/Auth.js';

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);


router.post('/forget-password', UserController.forgetPassword);
router.put('/reset-password/:token',  UserController.resetPassword);

router.get('/me', Auth, UserController.getUserInfo);
router.get('/all-user', Auth, UserController.getUserAllInfo);

router.put('/update-password', Auth, UserController.updatePassword);
router.put('/update', Auth, UserController.updateUser);
router.put('/update_role/:id', Auth, UserController.updateUserRole);
router.delete('/delete/:id', Auth, UserController.deleteUser);

router.get('/logout', UserController.logout);



export default router;