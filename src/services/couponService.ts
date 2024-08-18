import couponModel, {
  ICouponModel,
  IRepeatCountLimit,
} from "../models/coupon.model";
import { IUserRepeatCounts, userModel } from "../models/user.model";

export class CouponService {
  addCoupon(code: string, repeatCountsLimit: IRepeatCountLimit): void {
    const newCoupon: ICouponModel = {
      code,
      repeatCountsLimit,
      globalUsageCount: 0,
    };

    couponModel.add(code, newCoupon);
  }

  validateCoupon(code: string, userId: string): boolean {
    const coupon = couponModel.get(code);
    if (!coupon) {
      throw new Error("Coupon does not exist");
    }

    const user = userModel.getUser(userId);
    if (!user) {
      throw new Error("User does not exist");
    }

    user.resetUsageIfNeeded(code);

    const {
      userRepeatCounts,
      userPerDayRepeatCounts,
      userPerWeekRepeatCounts,
    } = user.getCouponUsage(code);

    const {
      repeatCountsLimit: {
        globalUsageLimit,
        userUsageLimit,
        userPerDayUsageLimit,
        userPerWeekUsageLimit,
      },
      globalUsageCount,
    } = coupon;

    if (globalUsageCount >= globalUsageLimit) {
      throw new Error("Global usage limit exceeded for this coupon.");
    }

    if (userRepeatCounts >= userUsageLimit) {
      throw new Error("User total usage limit exceeded for this coupon.");
    }

    if (userPerDayRepeatCounts >= userPerDayUsageLimit) {
      throw new Error("Daily usage limit exceeded for this coupon.");
    }

    if (userPerWeekRepeatCounts >= userPerWeekUsageLimit) {
      throw new Error("Weekly usage limit exceeded for this coupon.");
    }

    return true;
  }

  applyCoupon(code: string, userId: string): void {
    if (!this.validateCoupon(code, userId)) {
      throw new Error("Coupon usage limit exceeded");
    }

    const coupon = couponModel.get(code);
    if (!coupon) return;

    coupon.globalUsageCount += 1;
    couponModel.update(code, coupon);

    const user = userModel.getUser(userId);
    if (!user) return;

    const userUsage = user.getCouponUsage(code);
    for (const field in userUsage) {
      if (field !== "lastUsedDate") {
        userUsage[field as keyof Omit<IUserRepeatCounts, "lastUsedDate">] += 1;
      }
    }

    user.updateCouponUsage(code, userUsage);

    userModel.updateUser(userId, user);
  }
}

export const couponService = new CouponService();
