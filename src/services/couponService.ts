import { ICouponModel } from "../models/coupon.model";

export class CouponService {
  public static addCoupon(coupon: ICouponModel): void {
    console.log(coupon);
  }
}
