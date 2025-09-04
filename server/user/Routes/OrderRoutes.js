import { Router } from "express";
import OrderController from "../Controller/OrderController.js";
import { Auth, AllowedRoles } from "../../Middleware/Auth.js";

const router = Router();

router.post("/new-order", Auth, OrderController.newOrder);
router.get("/one-order/:id", Auth, OrderController.getOneOrder);
router.get("/orders/me", Auth, OrderController.getMyOrders);

// * admin routes
router.get(
  "/admin/all-order",
  Auth,
  AllowedRoles("admin"),
  OrderController.getAllOrders
);
router.put(
  "/admin/update-order/:id",
  Auth,
  AllowedRoles("admin"),
  OrderController.updateOrderStatus
);
router.delete(
  "/admin/delete-order/:id",
  Auth,
  AllowedRoles("admin"),
  OrderController.deleteOrder
);

export default router;
