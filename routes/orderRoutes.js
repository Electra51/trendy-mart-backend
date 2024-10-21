import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  OrderPlaceController,
  getAllOrdersController,
  getOrdersController,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/order-place", requireSignIn, OrderPlaceController);
router.get("/orders", requireSignIn, getOrdersController);
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

export default router;
