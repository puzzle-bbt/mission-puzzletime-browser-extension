import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {TimePresetModel} from './models/timePreset';
import {BASE_URL, NEW_ORDER_TIME, ORDER_TIME} from './helper/UrlLibrary';
import {BodyBuilder} from "./helper/BodyBuilder";

@Injectable({
  providedIn: 'root'
})
export class OrdertimesService {

  constructor(private _http: HttpClient) {}

  public getLoginPage(): any {
    return this._http.get(NEW_ORDER_TIME, {responseType: 'text'});
  }

  public setOrderTime(preset: TimePresetModel, hours: number) {
    this.getLoginPage().subscribe((result) => {
      let doc = new DOMParser().parseFromString(result, "text/html");
      let form = doc.getElementById("new_ordertime")
      let authenticity_token = form["elements"]["authenticity_token"]["value"];
      let newBody = this.buildBody(preset, hours, authenticity_token);

      this.getTabID().then((tabID) => {
        if (tabID == -1) {
          alert("Open " + BASE_URL + " and try again");
          return;
        }
        chrome.scripting.executeScript({
          target: {tabId: tabID},
          func: this.sendRequest,
          args: [newBody]
        });
      });
    });
  }

  public buildBody(preset: TimePresetModel, hours: number, authenticity_token: string) {
    const formData = new BodyBuilder();
    formData.set('utf8', "✓");
    formData.set('authenticity_token', authenticity_token);
    formData.set('back_url', "");
    formData.set('ordertime[account_id]', preset.puzzleAccount.id.toString());
    formData.set('ordertime[ticket]', preset.ticket);
    formData.set('ordertime[description]', preset.description);
    formData.set('ordertime[work_date]', this.formatDate(new Date()));
    formData.set('ordertime[hours]', hours.toString());
    formData.set('ordertime[billable]', preset.billable ? "1" : "0");
    formData.set('ordertime[meal_compensation]', preset.mealCompensation ? "1" : "0");
    formData.set('button', "");
    return formData.encode();
  }

  sendRequest = (body: string) => {
    fetch(ORDER_TIME, {
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
      },
      "body": body,
      "method": "POST",
    });
  }

  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  formatDate(date) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  async getTabID(): Promise<number> {
    let tabs = await chrome.tabs.query({});
    for (let tab of tabs) {
      let url1 = new URL(tab.url);
      if (url1.origin == BASE_URL) {
        return tab.id
      }
    }
    return -1;
  }
}

