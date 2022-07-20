import {TimePresetModel} from "../models/timePreset";

export class StorageController {
  private static KEY_PREFIX = "PuzzleTimeQuickSwitch"
  public static KEY_PRESETS = this.KEY_PREFIX + "Presets"
  public static KEY_DATE = this.KEY_PREFIX + "Date"

  private static async getLocalStorageValue(key) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.sync.get(key, function (value) {
          resolve(value);
        })
      } catch (ex) {
        reject(ex);
      }
    });
  }

  static async getPresets(): Promise<TimePresetModel[]> {
    let object = await StorageController.getLocalStorageValue(this.KEY_PRESETS);
    let encrypted = object[this.KEY_PRESETS] as string;
    if (typeof encrypted == "undefined") {
      return []
    }
    return JSON.parse(atob(encrypted)) as TimePresetModel[]
  }

  static async getValue(key:string): Promise<any> {
    let object = await StorageController.getLocalStorageValue(key);
    let encrypted = object[key];
    if (typeof encrypted != "undefined") {
      return JSON.parse(atob(encrypted));
    }
    return encrypted;
  }

  static saveValue(_key: string, presets: any) {
    let encodeValue = this.encodeValue(presets);
    chrome.storage.sync.set({[_key]: encodeValue}).then();
  }

  private static encodeValue(presets: any): string {
    return btoa(JSON.stringify(presets))
  }
}
