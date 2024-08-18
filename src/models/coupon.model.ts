export interface IRepeatCountLimit {
  globalUsageLimit: number;
  userUsageLimit: number;
  userPerDayUsageLimit: number;
  userPerWeekUsageLimit: number;
}

export interface ICouponModel {
  code: string;
  repeatCountsLimit: IRepeatCountLimit;
  globalUsageCount: number;
}

class Coupon {
  private coupons: Map<string, ICouponModel> = new Map();

  public add(code: string, coupon: ICouponModel): void {
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

  public getAllCoupons(): ICouponModel[] {
    return Array.from(this.coupons.values());
  }
}

const couponModel = new Coupon();

export default couponModel;
