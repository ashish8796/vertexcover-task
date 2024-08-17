export interface IUserRepeatCounts {
  userRepeatCounts: number;
  userPerDayRepeatCounts: number;
  userPerWeekRepeatCounts: number;
  userPerMonthRepeatCounts: number;
}

export interface IUserModel {
  name: string | null;
  email: string | null;
  password: string | null;
  userRepeatCounts?: IUserRepeatCounts;
  coupons?: string[];
}

export class User {
  constructor(
    public name: string | null = null,
    public email: string | null = null,
    public password: string | null = null,
    public userRepeatCounts: IUserRepeatCounts = {
      userRepeatCounts: 0,
      userPerDayRepeatCounts: 0,
      userPerWeekRepeatCounts: 0,
      userPerMonthRepeatCounts: 0,
    },
    public coupons: string[] = []
  ) {}

  public update(user: IUserModel): IUserModel {
    Object.assign(this, user);
    return this;
  }

  public delete(email: string): IUserModel {
    return this;
  }
}
