import {TimePresetModel} from "./models/timePreset";
import {StorageController} from "./helper/StorageController";
import {Account} from "./models/account";


let btn = document.createElement("button");
btn.innerHTML = "Add as preset";
btn.addEventListener("click", () => {
  let accountName: string = document.getElementById("ordertime_account_id-selectized")?.parentNode?.childNodes[0]?.textContent;
  let accountID: string = (document.getElementById("ordertime_account_id-selectized")?.parentNode?.childNodes[0] as HTMLElement).getAttribute("data-value");
  let ticket: string = document.getElementById("ordertime_ticket")["value"];
  let description: string = document.getElementById("ordertime_description")["value"];
  let mealCompensation: boolean = document.getElementById("ordertime_meal_compensation")["checked"];
  let billable: boolean = document.getElementById("ordertime_billable")["checked"];
  let timePreset: TimePresetModel = new TimePresetModel({
    puzzleAccount: new Account({id: +accountID, name: accountName}),
    ticket: ticket,
    description: description,
    mealCompensation: mealCompensation,
    billable: billable
  });


  if (!isObjectPropertyNull(timePreset)) {
    addPreset(timePreset);


  } else {
    alert("Bitte alle Felder ausfüllen");
  }
});

let container = document.getElementById("content")
container.appendChild(btn);

function addPreset(preset: TimePresetModel) {
  StorageController.getPresets().then(result => {
    if (result.map(e => JSON.stringify(e)).indexOf(JSON.stringify(preset)) == -1) {
      result.push(preset)
      StorageController.saveValue(StorageController.KEY_PRESETS, result);
    } else {
      alert("Preset existiert bereits")
    }
  });
}

function isObjectPropertyNull(preset: TimePresetModel) {
  return preset?.puzzleAccount.name == "" ||
    preset?.ticket == "" ||
    preset?.description == "";
}




