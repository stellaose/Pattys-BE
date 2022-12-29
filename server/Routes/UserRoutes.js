import { Router } from 'express';
import UserController from '../Controller/UserController.js';
import { Auth, AllowedRoles }  from '../Middleware/Auth.js';

const router = Router();

// * /v1/user
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);

router.post('/forget-password', UserController.forgetPassword);
router.put('/reset-password/:token',  UserController.resetPassword);

// * authentication routes
router.put('/update-password', Auth, UserController.updatePassword);
router.put('/me/update', Auth, UserController.updateUser);
router.get('/me', Auth, UserController.UserInfo);

// ! admin routes
router.get('/admin/single-user/:id', Auth, AllowedRoles("admin"), UserController.SingleUser);
router.get('/admin/all-user', Auth, AllowedRoles("admin"), UserController.AllUserInfo);
router.put('/admin/update-role/:id', Auth, AllowedRoles("admin"), UserController.updateUserRole);
router.delete('/admin/delete-user/:id', Auth, AllowedRoles("admin"), UserController.deleteUser);


export default router;