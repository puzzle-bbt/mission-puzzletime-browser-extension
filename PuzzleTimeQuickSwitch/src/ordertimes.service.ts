import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {TimePresetModel} from './models/timePreset';
import {BASE_URL, SET_ORDER_TIME} from './helper/UrlLibrary';

@Injectable({
  providedIn: 'root'
})
export class OrdertimesService {
  private readonly httpOptions: { headers: HttpHeaders };

  constructor(private _http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/www-x-form-urlencoded',
        "Cookie": "_session_id=42fb3049c55234196813f1f0402a3311; e007d911eff228f4cbacf657e39edefb=cdd06e20087fd08facb50d3503694fb9; _session_id=42fb3049c55234196813f1f0402a3311; _session_id=42fb3049c55234196813f1f0402a3311",
        "Origin": BASE_URL
      })
    }
  }

// +"?authenticity_token=sNMk592JV2wwHn6DPJ8C5oy/hHDnjIlZBOHyngtTbpQ="

test = "utf8=%E2%9C%93&_method=patch&authenticity_token=yE5%2FUBypGT%2BmG28Rz23aY46uRTeK7yScQPjlfoPuPuwzc3vzlylB0wQdh6B6Z9V1FbeNZiakm1zoFpWOpqPXRg%3D%3D&back_url=&ordertime%5Baccount_id%5D=6969&ordertime%5Bticket%5D=gsdfg&ordertime%5Bdescription%5D=+diligafgdsgfsdgfsddgfgsdfgds&ordertime%5Bwork_date%5D=22.07.2022&ordertime%5Bhours%5D=5.0&ordertime%5Bfrom_start_time%5D=&ordertime%5Bto_end_time%5D=&ordertime%5Bbillable%5D=0&ordertime%5Bbillable%5D=1&ordertime%5Bmeal_compensation%5D=0&button="
  public setOrderTime(ordertime: TimePresetModel) {
    return this._http.post(SET_ORDER_TIME, this.test, this.httpOptions);
  }

  public buildBody() {
    let body = new HttpParams();
    body.set('account_id', "6969");
    body.set('ticket', "TestTicket");
    body.set('description', "test");
    body.set('work_date', "22.07.2022");
    body.set('hours', "5");
    body.set('billable', "1");
    body.set('meal_compensation', "1");
    console.log(body.toString());
    return body.toString();
  }
}

