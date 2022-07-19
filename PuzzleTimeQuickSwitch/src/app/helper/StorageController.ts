import {timePresetModel} from "../models/timePreset";

export class StorageController {
  static async getLocalStorageValue(key) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(key, function (value) {
          resolve(value);
        })
      }
      catch (ex) {
        reject(ex);
      }
    });
  }

  static async getPresets(): Promise<timePresetModel[]> {
    let object = await StorageController.getLocalStorageValue("presets");
    let encrypted = object["presets"] as string;
    if(typeof encrypted == "undefined"){
      return []
    }
    return JSON.parse(atob(encrypted)) as timePresetModel[]
  }

  static setPresets(presets: timePresetModel[]){
    chrome.storage.sync.set({"presets": this.encodePresets(presets)}).then();
  }

  private static encodePresets(presets: timePresetModel[]) {
    return btoa(JSON.stringify(presets))
  }
}
