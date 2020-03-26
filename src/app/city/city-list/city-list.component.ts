import { Component, OnDestroy, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CityService } from '../city.service';
import { City } from '../../shared/models/city.model';

const COLUMNS_DEFAULT = ['name', 'state', 'population', 'actions'];

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnDestroy, OnInit {
  private ngUnsubscribe$ = new Subject();

  displayedColumns: string[] = COLUMNS_DEFAULT;
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @Output() openCityForm = new EventEmitter<any>();
  @Output() openDeleteModal = new EventEmitter<any>();

  constructor(
    private cityService: CityService,
  ) { }

  ngOnInit() {
    this.cityService.cityList$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(city => this.initDataSource(city));

    this.loadCities();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  loadCities() {
    this.cityService
      .loadCities()
      .subscribe(data => {}, err => {});
  }

  initDataSource(data) {
    if (this.dataSource == null) {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (obj: any, filter) => {
        const dataStr = JSON.stringify(obj).toLowerCase();
        return dataStr.indexOf(filter.trim().toLowerCase()) !== -1;
      };
    } else {
      this.dataSource.data = data;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCity(city: City) {
    this.openDeleteModal.emit(city);
  }

  onCreateCity(event) {
    this.openCityForm.emit(event);
  }
}
