import express from "express";
import { addToCart, getCartTotal } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/total", getCartTotal);

export default router;
