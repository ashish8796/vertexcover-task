import express from "express";
import {
  addCoupon,
  validateCoupon,
  applyCoupon,
} from "../controllers/couponController";

const router = express.Router();

router.post("/coupons/addCouponRepeatCounts", addCoupon);
router.get("/coupons/validate", validateCoupon);
router.post("/coupons/apply", applyCoupon);

export default router;
