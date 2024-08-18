import couponModel, { IRepeatCountLimit } from "../models/coupon.model";
import { userModel } from "../models/user.model";
import { couponService, CouponService } from "../services/couponService";

describe("CouponService", () => {
  let couponService: CouponService;

  beforeEach(() => {
    couponService = new CouponService();
    // Clear models before each test
    (userModel as any).users.clear();
    (couponModel as any).coupons.clear();
  });

  it("should throw an error if global usage limit is exceeded", () => {
    const repeatCountLimit: IRepeatCountLimit = {
      globalUsageLimit: 1,
      userUsageLimit: 1,
      userPerDayUsageLimit: 1,
      userPerWeekUsageLimit: 1,
    };

    couponService.addCoupon("SUMMER21", repeatCountLimit);
    const user = userModel.createUser("John Doe", "john@example.com");

    // Apply the coupon once
    couponService.applyCoupon("SUMMER21", user.id);

    // Validate again, should throw an error for global usage limit exceeded
    expect(() => couponService.validateCoupon("SUMMER21", user.id)).toThrow(
      "Global usage limit exceeded for this coupon."
    );
  });

  it("should apply a coupon and update user usage counts", () => {
    const repeatCountLimit: IRepeatCountLimit = {
      globalUsageLimit: 10000,
      userUsageLimit: 5,
      userPerDayUsageLimit: 1,
      userPerWeekUsageLimit: 2,
    };

    couponService.addCoupon("SUMMER21", repeatCountLimit);
    const user = userModel.createUser("John Doe", "john@example.com");

    couponService.applyCoupon("SUMMER21", user.id);

    const coupon = couponModel.get("SUMMER21");
    expect(coupon?.globalUsageCount).toBe(1);

    const userUsage = user.getCouponUsage("SUMMER21");
    expect(userUsage.userRepeatCounts).toBe(1);
    expect(userUsage.userPerDayRepeatCounts).toBe(1);
    expect(userUsage.userPerWeekRepeatCounts).toBe(1);
  });

  it("should throw an error if daily usage limit is exceeded", () => {
    const repeatCountLimit: IRepeatCountLimit = {
      globalUsageLimit: 10000,
      userUsageLimit: 5,
      userPerDayUsageLimit: 1,
      userPerWeekUsageLimit: 2,
    };

    couponService.addCoupon("SUMMER21", repeatCountLimit);
    const user = userModel.createUser("John Doe", "john@example.com");

    // Simulate the user has already used the coupon for the day
    user.updateCouponUsage("SUMMER21", {
      userRepeatCounts: 1,
      userPerDayRepeatCounts: 1,
      userPerWeekRepeatCounts: 1,
      lastUsedDate: new Date(),
    });

    expect(() => couponService.validateCoupon("SUMMER21", user.id)).toThrow(
      "Daily usage limit exceeded for this coupon."
    );
  });

  it("should throw an error if weekly usage limit is exceeded", () => {
    const repeatCountLimit: IRepeatCountLimit = {
      globalUsageLimit: 10000,
      userUsageLimit: 5,
      userPerDayUsageLimit: 2,
      userPerWeekUsageLimit: 2,
    };

    couponService.addCoupon("SUMMER21", repeatCountLimit);
    const user = userModel.createUser("John Doe", "john@example.com");

    // Simulate the user has already used the coupon for the week
    user.updateCouponUsage("SUMMER21", {
      userRepeatCounts: 1,
      userPerDayRepeatCounts: 1,
      userPerWeekRepeatCounts: 2,
      lastUsedDate: new Date(),
    });

    expect(() => couponService.validateCoupon("SUMMER21", user.id)).toThrow(
      "Weekly usage limit exceeded for this coupon."
    );
  });
});
