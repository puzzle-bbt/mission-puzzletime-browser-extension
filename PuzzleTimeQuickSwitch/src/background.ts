import {timePresetModel} from "./app/models/timePreset";
import {StorageController} from "./app/helper/StorageController";


let btn = document.createElement("button");
btn.innerHTML = "Add as preset";
btn.addEventListener("click", () => {
  let accountName: string = document.getElementById("ordertime_account_id-selectized")?.parentNode?.childNodes[0]?.textContent;
  let ticket: string = document.getElementById("ordertime_ticket")["value"];
  let description: string = document.getElementById("ordertime_description")["value"];
  let mealCompensation: boolean = document.getElementById("ordertime_meal_compensation")["checked"];
  let billable: boolean = document.getElementById("ordertime_billable")["checked"];
  let timePreset: timePresetModel = new timePresetModel({
    accountName: accountName,
    ticket: ticket,
    description: description,
    mealCompensation: mealCompensation,
    billable: billable
  });
  console.log(timePreset)
  console.log(isObjectPropertyNull(timePreset))
  if (!isObjectPropertyNull(timePreset)) {
    addPreset(timePreset).then(r => r);
  }
});

let container = document.getElementById("content")
container.appendChild(btn);

async function addPreset(preset: timePresetModel) {
  let data = await StorageController.getPresets();
  data.push(preset)
  StorageController.setPresets(data);
  console.log(await StorageController.getPresets())
}

function isObjectPropertyNull(preset: timePresetModel) {
    return preset?.accountName=="" ||
      preset?.ticket == "" ||
      preset?.description == "" ;


}


