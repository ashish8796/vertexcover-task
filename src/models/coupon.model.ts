export interface IRepeatCountLimit {
  globalUsageLimit: number;
  userUsageLimit?: number;
  userPerDayUsageLimit?: number;
  userPerWeekUsageLimit?: number;
  userPerMonthUsageLimit?: number;
}

export interface ICouponModel {
  code: string;
  repeatCountLimit: IRepeatCountLimit;
  globalUsageCount: number;
}

export class Coupon {
  private coupons: Map<string, ICouponModel> = new Map();

  public add(code: string, usageLimit: number): void {
    const coupon: ICouponModel = {
      code,
      repeatCountLimit: {
        globalUsageLimit: usageLimit,
      },
      globalUsageCount: 0,
    };

    this.coupons.set(code, coupon);
  }

  public get(code: string): ICouponModel | undefined {
    return this.coupons.get(code);
  }

  public update(code: string, coupon: ICouponModel): ICouponModel | undefined {
    this.coupons.set(code, coupon);

    return this.coupons.get(code);
  }

  public delete(code: string): ICouponModel | undefined {
    const coupon = this.coupons.get(code);
    this.coupons.delete(code);

    return coupon;
  }
}

export default new Coupon();
