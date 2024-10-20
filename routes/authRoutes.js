import express from "express";
import {
  loginController,
  registerController,
  testController,
} from "../controllers/authController.js";

import {
  getAllOrdersController,
  getOrdersController,
  orderStatusController,
} from "../controllers/orderController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

//all routes

router.post("/register", registerController);

//Login ; method POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

// router.get(
//   "/get-promo-code-user",
//   requireSignIn,
//   promoCodeGetForUserController
// );

export default router;
