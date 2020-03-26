import { Component, OnInit, OnDestroy } from '@angular/core';
import { STATES } from '../shared/models/state.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StateService } from '../state/state.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject();

  states = STATES;
  selectedOption = 'sc';
  imgSrc = 'assets/sc.png';
  stateInfo: any;
  hasData = false;

  constructor(private stateService: StateService) {}

  ngOnInit() {
    this.stateInfo = {
      cities: [],
      info: {
        totalPopulation: 0,
        totalCostUrl: 0,
        totalCostBrl: 0
      }
    };

    this.stateService.stateInfo$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(data => this.stateInfo = data);

    this.loadStateInfo();
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

  loadStateInfo() {
    this.stateService
      .loadStateInfo(this.selectedOption)
      .subscribe(data => { this.hasData = true; });
  }

  setStateInfo() {
    this.imgSrc = `assets/${this.selectedOption}.png`;
    this.loadStateInfo();
  }
}


