import {Component, ViewChild} from '@angular/core';
import {TimePresetModel} from "../models/timePreset";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {StorageController} from "../helper/StorageController";
import {moveItemInArray} from "@angular/cdk/drag-drop";
import {OrdertimesService} from "../services/ordertimes.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { NotifierService } from 'src/services/notifier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public pageSize = 5;
  public currentPage = 0;
  title = 'PuzzleBrowserExtension';
  data: TimePresetModel[] = [];
  dataSource: MatTableDataSource<any>;
  ticketStartTime: Date;
  expandedElement: TimePresetModel | null;
  displayedColumns: string[] = [
    "expand",
    "puzzleAccount.name",
    "ticket",
    "billable",
    "mealCompensation",
    "delete"
  ];

  constructor(private _ordertimeService: OrdertimesService,
              private _notifierService: NotifierService
  ) {
  }

  ngOnInit() {
    StorageController.getValue(StorageController.KEY_DATE).then(r => {
      this.ticketStartTime = r as Date;
    });
    StorageController.getPresets().then(r => {
      this.data = r;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sortingDataAccessor = (data: object, sortHeaderId: string): string | number => {
        const propPath = sortHeaderId.split('.');
        const value: any = propPath
          .reduce((curObj, property) => curObj[property], data);
        return !isNaN(value) ? Number(value) : value;
      };
      this.dataSource.sort = this.sort;
      this.iterator();
    });
  }

  delete(element: TimePresetModel) {
    if(element == this.data[0]){
      this._notifierService.openSnackBar("Sie können das Ticket welches sie ausgewählt haben nicht löschen", "ok")
      return;
    }
    StorageController.getPresets().then((result) => {
      let index: number = this.indexOfElement(result, element);
      result.splice(index, 1);
      this.data = result;
      this.dataSource.data = this.data;
      StorageController.saveValue(StorageController.KEY_PRESETS, this.data);
    });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const start = this.currentPage * this.pageSize;
    const end = (this.currentPage + 1) * this.pageSize;
    this.dataSource.data = this.data.slice(start, Math.min(this.data.length, end));
  }

  selectRow(row: TimePresetModel) {
    if(row == this.data[0] && this.isPresetSelected()){
      this._notifierService.openSnackBar("Das aktuelle Ticket wurde abgebrochen", "ok")
      this.ticketStartTime = undefined;
      chrome.storage.sync.remove(StorageController.KEY_DATE);
      return;
    }

    if(this.isPresetSelected()){
      this._notifierService.openSnackBar("Bitte beenden sie zuerst das aktuelle Ticket", "ok")
      return;
    }

    this.ticketStartTime = new Date();
    let index: number = this.indexOfElement(this.data, row)
    moveItemInArray(this.data, index, 0);
    this.dataSource.data = this.data;
    this.iterator();
    StorageController.saveValue(StorageController.KEY_PRESETS, this.data);
    StorageController.saveValue(StorageController.KEY_DATE, this.ticketStartTime);
  }

  indexOfElement(array: any[], element): number {
    return array.map(e => JSON.stringify(e)).indexOf(JSON.stringify(element))
  }

  isPresetSelected(): boolean {
    return typeof this.ticketStartTime != "undefined";
  }

  submit() {
    let timePresetModel = this.data[0];
    let start = new Date(this.ticketStartTime).getTime();
    let workTimeMilli = new Date().getTime() - start;
    let workTimeHour = workTimeMilli / 1000 / 60 /60;
    workTimeHour = Math.round((workTimeHour + Number.EPSILON) * 100) / 100;

    if(workTimeHour > 0.00){
      this.ticketStartTime = undefined;
      chrome.storage.sync.remove(StorageController.KEY_DATE);
      this._ordertimeService.setOrderTime(timePresetModel, workTimeHour);
    }else{
      this._notifierService.openSnackBar("Du must mindestens für eine Minute arbeiten bevor du das Ticket speichern kannst", "ok")
    }
  }
}
