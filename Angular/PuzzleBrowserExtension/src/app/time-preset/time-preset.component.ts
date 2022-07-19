import {Component, Input, OnInit} from '@angular/core';
import {timePresetModel} from "../models/timePreset";

@Component({
  selector: 'app-time-preset',
  templateUrl: './time-preset.component.html',
  styleUrls: ['./time-preset.component.scss']
})
export class TimePresetComponent implements OnInit {
@Input() data:timePresetModel;
  constructor() { }

  ngOnInit(): void {
  }
}
