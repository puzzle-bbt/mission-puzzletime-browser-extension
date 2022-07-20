import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TimePresetModel} from './models/timePreset';
import {SET_ORDER_TIME} from './helper/UrlLibrary';

@Injectable({
  providedIn: 'root'
})
export class OrdertimesService {
  private readonly httpOptions: { headers: HttpHeaders };

  constructor(private _http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

  public setOrderTime(ordertime: TimePresetModel) {
    return this._http.post(SET_ORDER_TIME, {}, this.httpOptions);
  }
}

