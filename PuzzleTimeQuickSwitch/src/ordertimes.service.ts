import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {TimePresetModel} from './models/timePreset';
import {BASE_URL, SET_ORDER_TIME} from './helper/UrlLibrary';
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
        "Cookie": "Idea-d4a13ec=52bcd015-b657-49ce-b44a-38a2e529a531; _session_id=1255d71871649b5a1b24a69706be03e9",
      })
    }
  }

// +"?authenticity_token=sNMk592JV2wwHn6DPJ8C5oy/hHDnjIlZBOHyngtTbpQ="


  public setOrderTime(ordertime: TimePresetModel, hours: number) {
    let newBody = "utf8=%E2%9C%93&authenticity_token=ZovChpl7OK6X1JnNWlBo4J2udmXxGmvHyOKs18kJtNFqO8avSLRfuUkvPdbMu%2BW2yIpq10e9FBle7JTlY66OJA%3D%3D&back_url=&ordertime%5Baccount_id%5D=7552&ordertime%5Bticket%5D=Test&ordertime%5Bdescription%5D=Test&ordertime%5Bwork_date%5D=23.07.2022&ordertime%5Bhours%5D=5&ordertime%5Bbillable%5D=0&ordertime%5Bbillable%5D=1&ordertime%5Bmeal_compensation%5D=0&button="
    this.getValue(newBody);
    newBody = this.buildBody(ordertime,hours);
    this.getTab().then(tabID => {
      chrome.scripting.executeScript({
        target: {tabId: tabID},
        func: this.sendRequest,
        args:[newBody]
      });{}}
    );
  }

  async getTab() {
    let queryOptions = {active: true, currentWindow: true};
    let tabs = await chrome.tabs.query(queryOptions);
    return tabs[0].id;
  }

  public buildBody(preset: TimePresetModel, hours:number) {
    const formData = new BodyBuilder();
    formData.set('utf8', "✓");
    formData.set('authenticity_token', "ZovChpl7OK6X1JnNWlBo4J2udmXxGmvHyOKs18kJtNFqO8avSLRfuUkvPdbMu+W2yIpq10e9FBle7JTlY66OJA==");
    formData.set('back_url', "");
    formData.set('ordertime[account_id]', preset.puzzleAccount.id.toString());
    formData.set('ordertime[ticket]', preset.ticket);
    formData.set('ordertime[description]', preset.description);
    formData.set('ordertime[work_date]', this.formatDate(new Date()));
    formData.set('ordertime[hours]', hours.toString());
    formData.set('ordertime[billable]', preset.billable ? "1":"0");
    formData.set('ordertime[meal_compensation]', preset.mealCompensation ? "1":"0");
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

  getValue(data: string){
    let values = data.split("&");
    let result = new Map<string, string>;
    for (let valuePair of values){
      let valuePairArray = valuePair.split("=")
      result.set(decodeURIComponent(valuePairArray[0]), decodeURIComponent(valuePairArray[1]));
    }
    console.log(result)
  }

  // formData.set('utf8', "✓");
  // formData.set('authenticity_token', "ZovChpl7OK6X1JnNWlBo4J2udmXxGmvHyOKs18kJtNFqO8avSLRfuUkvPdbMu+W2yIpq10e9FBle7JTlY66OJA==");
  // formData.set('back_url', "");
  // formData.set('ordertime[account_id]', "7552");
  // formData.set('ordertime[ticket]', "Yeet");
  // formData.set('ordertime[description]', "Test");
  // formData.set('ordertime[work_date]', "23.07.2022");
  // formData.set('ordertime[hours]', "5");
  // formData.set('ordertime[billable]', "1");
  // formData.set('ordertime[meal_compensation]', "0");
  // formData.set('button', "");
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

