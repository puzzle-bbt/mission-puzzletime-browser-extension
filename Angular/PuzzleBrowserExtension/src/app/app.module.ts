import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimePresetComponent } from './time-preset/time-preset.component';
import {background} from "../background";

@NgModule({
  declarations: [
    AppComponent,
    TimePresetComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [background],
  bootstrap: [AppComponent]
})
export class AppModule { }
