import { Router } from "express";
import AdminAuthController from "../Controller/AdminAuthController.js";
import { AuthAdmin, AllowedRoles } from "../../Middleware/Auth.js";

const router = Router();

router.post("/register", AdminAuthController.register);
router.post("/login", AdminAuthController.login);
router.post("/forget-password", AdminAuthController.forgetPassword);
router.put("/reset-password/:token", AdminAuthController.resetPassword);
router.put("/update-password", AuthAdmin, AdminAuthController.updatePassword);

router.get("/me", AuthAdmin, AdminAuthController.UserInfo);
router.get(
  "/single-user/:id",
  AuthAdmin,
  AllowedRoles(["admin", "super admin"]),
  AdminAuthController.SingleUser
);
router.get(
  "/all-users",
  AuthAdmin,
  AllowedRoles(["admin", "super admin"]),
  AdminAuthController.AllUserInfo
);
router.put(
  "/update-role/:id",
  AuthAdmin,
  AllowedRoles(["admin", "super admin"]),
  AdminAuthController.updateUserRole
);
router.delete(
  "/delete-user/:id",
  AuthAdmin,
  AllowedRoles(["admin", "super admin"]),
  AdminAuthController.deleteUser
);

router.get("/logout", AdminAuthController.logout);

export default router;
