import { Injectable } from '@angular/core';
import {timePresetModel} from "../app/models/timePreset";

@Injectable({
  providedIn: 'root'
})
export class PresetsService {
  public presets:timePresetModel[] = [];
  constructor() { }
}
