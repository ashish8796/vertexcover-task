import { Request, Response } from "express";
import { couponService } from "../services/couponService";
import { errorHandler } from "../utils/errorHandler";

export const addCoupon = (req: Request, res: Response): void => {
  try {
    const { code, repeatCountConfig } = req.body;

    couponService.addCoupon(code, repeatCountConfig);
    res.status(201).send({ message: "Coupon added successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const validateCoupon = (req: Request, res: Response): void => {
  try {
    const { couponCode, userId } = req.query;

    const isValid = couponService.validateCoupon(
      couponCode as string,
      userId as string
    );

    res.status(200).send({ isValid });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const applyCoupon = (req: Request, res: Response): void => {
  try {
    const { couponCode, userId } = req.body;

    couponService.applyCoupon(couponCode, userId);
    res.status(200).send({ message: "Coupon applied successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};
