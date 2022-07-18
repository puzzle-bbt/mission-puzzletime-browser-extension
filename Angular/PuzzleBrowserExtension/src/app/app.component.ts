import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PuzzleBrowserExtension';
  test:string = "Hmmm"

  constructor() {
  }

  ngOnInit() {
    console.log("test")
    this.test = "yeet"
    sessionStorage.setItem('test','testhallo')
    this.title = sessionStorage.getItem('test');
    debugger;
    this.test = sessionStorage.getItem("data").length as unknown as string;
    chrome.storage.sync.get('data', ({ data }) => {
      this.test = data;
    });
    console.error("test");
    // console.log("test")
  }
}
