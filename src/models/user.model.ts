import {
  timeDifferenceInDays,
  timeDifferenceInWeeks,
} from "../utils/dateUtils";

export interface IUserRepeatCounts {
  userRepeatCounts: number;
  userPerDayRepeatCounts: number;
  userPerWeekRepeatCounts: number;
  lastUsedDate?: Date;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  userRepeatCounts?: Map<string, IUserRepeatCounts>;

  getCouponUsage(couponCode: string): IUserRepeatCounts;
  updateCouponUsage(couponCode: string, usage: IUserRepeatCounts): void;
  resetUsageIfNeeded(couponCode: string): void;
}

export class User implements IUser {
  userRepeatCounts: Map<string, IUserRepeatCounts>;

  constructor(public id: string, public name: string, public email: string) {
    this.userRepeatCounts = new Map();
  }

  getCouponUsage(couponCode: string): IUserRepeatCounts {
    return (
      this.userRepeatCounts.get(couponCode) || {
        userRepeatCounts: 0,
        userPerDayRepeatCounts: 0,
        userPerWeekRepeatCounts: 0,
        lastUsedDate: new Date(),
      }
    );
  }

  updateCouponUsage(couponCode: string, usage: IUserRepeatCounts): void {
    this.userRepeatCounts.set(couponCode, usage);
  }

  resetUsageIfNeeded(couponCode: string): void {
    const usage = this.getCouponUsage(couponCode);
    const now = new Date();
    const lastUsedDate = usage.lastUsedDate
      ? new Date(usage.lastUsedDate)
      : new Date();

    // Reset daily count if more than 24 hours have passed since last use
    if (timeDifferenceInDays(now, lastUsedDate) >= 1) {
      usage.userPerDayRepeatCounts = 0;
    }

    // Reset weekly count if more than 7 days have passed since last use
    if (timeDifferenceInWeeks(now, lastUsedDate) >= 1) {
      usage.userPerWeekRepeatCounts = 0;
    }

    // Update the last used date to now
    usage.lastUsedDate = now;

    this.updateCouponUsage(couponCode, usage);
  }
}

export class UserModel {
  private static instance: UserModel;
  private users: Map<string, IUser>;
  private idCounter: number;

  private constructor() {
    this.users = new Map();
    this.idCounter = 1;
  }

  public static getInstance(): UserModel {
    if (!UserModel.instance) {
      UserModel.instance = new UserModel();
    }
    return UserModel.instance;
  }

  createUser(name: string, email: string): IUser {
    const id = this.idCounter.toString();
    const user = new User(id, name, email);
    this.users.set(id, user);
    this.idCounter++;
    return user;
  }

  getUser(id: string): IUser | undefined {
    return this.users.get(id);
  }

  updateUser(id: string, user: IUser): IUser | undefined {
    this.users.set(id, user);
    return this.users.get(id);
  }

  getAllUsers(): Map<string, IUser> {
    return this.users;
  }
}

const userModel = UserModel.getInstance();

// Generating 10 users for test purpose
for (let i = 1; i <= 10; i++) {
  const name = `User${i}`;
  const email = `user${i}@example.com`;
  userModel.createUser(name, email);
}

export { userModel };
