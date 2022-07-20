export class Account{
  id?:number;
  name?:string;

  public constructor(init?:Partial<Account>) {
    Object.assign(this, init);
  }
}
