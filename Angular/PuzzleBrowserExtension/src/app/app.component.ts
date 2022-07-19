import {Component, OnInit} from '@angular/core';
import {StorageController} from 'src/app/helper/StorageController';
import {timePresetModel} from "./models/timePreset";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PuzzleBrowserExtension';
  test: string = "Hmmm"
  data: timePresetModel[] = [];
  shown: boolean = false;

  constructor() {
  }

  async ngOnInit() {
    this.data = await StorageController.getPresets();
  }
}
