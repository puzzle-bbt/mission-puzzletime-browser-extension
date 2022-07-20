import {Account} from "./account";

export class TimePresetModel {
  puzzleAccount?:Account;
  ticket?:string;
  description?:string;
  billable?:boolean;
  mealCompensation?:boolean;


  public constructor(init?:Partial<TimePresetModel>) {
    Object.assign(this, init);
  }
}
