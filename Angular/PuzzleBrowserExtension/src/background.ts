import {timePresetModel} from "./app/models/timePreset";
import {Injectable} from "@angular/core";
import {PresetsService} from "./services/presets.service";

@Injectable()
export class background{
  constructor(private _timePresets:PresetsService){

  }
  createButton(){
    let btn = document.createElement("button");
    btn.innerHTML = "Add as preset";
    btn.onclick = () => {
      let accountName:string = document.getElementById("ordertime_account_id-selectized").parentNode.childNodes[0].textContent;
      let ticket:string = document.getElementById("ordertime_ticket")["value"];
      let description:string = document.getElementById("ordertime_description")["value"];
      let mealCompensation:boolean = document.getElementById("ordertime_meal_compensation")["value"];
      let billable:boolean = document.getElementById("ordertime_billable")["value"];
      let timePreset:timePresetModel = {accountName:accountName, ticket:ticket, description:description,mealCompensation:mealCompensation, billable: billable};
      console.log(timePreset);
      this._timePresets.presets.push(timePreset);
    };

    let container = document.getElementById("content")
    container.appendChild(btn);
  }
}
