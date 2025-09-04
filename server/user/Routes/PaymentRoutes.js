import { Router } from "express";
import PaymentController from "../Controller/PaymentController.js";
import { Auth } from "../../Middleware/Auth.js";

const router = Router();

// - /v1/payment/process-payment
router.post("/process-payment", PaymentController.processPayment);

// ? /v1/payment/send-stripe-key
router.get("/send-stripe-key", Auth, PaymentController.sendStripeKey);

export default router;
