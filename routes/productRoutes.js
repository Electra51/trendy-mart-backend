import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import upload from "../config/multer.js";

const router = express.Router();

// create Product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  upload.single("photo"),
  createProductController
);

router.get("/get-product", getProductController);
router.get("/get-product/:pid", getSingleProductController);
router.delete("/delete-product/:pid", deleteProductController);

export default router;
