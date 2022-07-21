import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {TimePresetModel} from './models/timePreset';
import {BASE_URL, NEW_ORDER_TIME, ORDER_TIME} from './helper/UrlLibrary';
import {BodyBuilder} from "./helper/BodyBuilder";

@Injectable({
  providedIn: 'root'
})
export class OrdertimesService {
  private readonly httpOptions: { headers: HttpHeaders };

  constructor(private _http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/www-x-form-urlencoded',
        'Origin': BASE_URL,
        "Cookie": "e007d911eff228f4cbacf657e39edefb=cdd06e20087fd08facb50d3503694fb9; _session_id=6a5f0e0b736633c81466fd6fbaa60ab2"
      })
    }
  }

public getLoginPage(): any {
    return this._http.get(NEW_ORDER_TIME, {responseType: 'text'});

}

  public setOrderTime(preset: TimePresetModel, hours: number) {

    this.getLoginPage().subscribe((result)=>{
      let doc = new DOMParser().parseFromString(result, "text/html");
      let form = doc.getElementById("new_ordertime")
      let authenticity_token = form["elements"]["authenticity_token"]["value"];
      let newBody = this.buildBody(preset, hours, authenticity_token);
      this.getTab().then(tabID => {
          chrome.scripting.executeScript({
            target: {tabId: tabID},
            func: this.sendRequest,
            args: [newBody]
          });
        }
      );
    });

  }

  async getTab() {
    let queryOptions = {active: true, currentWindow: true};
    let tabs = await chrome.tabs.query(queryOptions);
    return tabs[0].id;
  }

  public buildBody(preset: TimePresetModel, hours: number, authenticity_token:string) {
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
    fetch("https://pitc-puzzletime-int.ocp.cloudscale.puzzle.ch/ordertimes", {
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
      },
      "body": body,
      "method": "POST",
    });
  }

  // getValue(data: string){
  //   let values = data.split("&");
  //   let result = new Map<string, string>;
  //   for (let valuePair of values){
  //     let valuePairArray = valuePair.split("=")
  //     result.set(decodeURIComponent(valuePairArray[0]), decodeURIComponent(valuePairArray[1]));
  //   }
  //   console.log(result)
  // }

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
}

