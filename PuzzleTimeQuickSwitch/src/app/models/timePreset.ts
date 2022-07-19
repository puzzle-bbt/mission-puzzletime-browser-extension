export class timePresetModel {
  accountName?:string;
  ticket?:string;
  description?:string;
  billable?:boolean;
  mealCompensation?:boolean;


  public constructor(init?:Partial<timePresetModel>) {
    Object.assign(this, init);
  }

  public equals(other:timePresetModel){
    console.log("test")
    return this?.accountName==other.accountName &&
      this?.ticket == other?.ticket &&
      this?.description == other?.description &&
      this?.billable == other?.billable&&
      this?.mealCompensation == other?.mealCompensation
  }
}
