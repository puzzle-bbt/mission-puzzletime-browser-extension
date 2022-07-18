import { Component } from '@angular/core';
import {PresetsService} from "../services/presets.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PuzzleBrowserExtension';

  constructor(public presetsService:PresetsService){
  }

}
