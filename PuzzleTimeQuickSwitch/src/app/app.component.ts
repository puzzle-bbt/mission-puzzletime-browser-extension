import {Component, ViewChild} from '@angular/core';
import {timePresetModel} from "./models/timePreset";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {StorageController} from "./helper/StorageController";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PuzzleBrowserExtension';
  data: timePresetModel[] = [];
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  public pageSize = 5;
  public currentPage = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    "account",
    "ticket",
    "description",
    "billable",
    "mealCompensation",
    "update",
    "delete"
  ];

  constructor() {
  }

  async ngOnInit() {
    this.data = await StorageController.getPresets();
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (data: object, sortHeaderId: string): string | number => {
      const propPath = sortHeaderId.split('.');
      const value: any = propPath
        .reduce((curObj, property) => curObj[property], data);
      return !isNaN(value) ? Number(value) : value;
    };
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.iterator();
  }

  delete(element:any): void {

  }

  update(element:any): void {

  }

  getDateOfDateObject(date: Date): string {
    return new Date(date).toDateString();
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
}
