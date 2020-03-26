import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { City } from '../../shared/models/city.model';
import { STATES } from '../../shared/models/state.model';
import { CityService } from '../city.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-city-form',
  templateUrl: 'city-form.component.html',
  styleUrls: ['./city-form.component.scss']
})
export class CityFormComponent implements OnInit {
  @Output() closeCityForm = new EventEmitter<any>();

  cities = new FormArray([]);
  city: City;
  states = STATES;

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.addCity();
  }

  addCity() {
    this.cities.push(
      this.formBuilder.group({
        name: ['', Validators.required],
        state: ['', Validators.required],
        population: ['', Validators.required]
      })
    );
  }

  removeCity(idx: number) {
    this.cities.removeAt(idx);
  }

  onCancel(): void {
    this.closeCityForm.emit(true);
  }

  onConfirm(): void {
    if (this.cities.invalid) return;

    const cities: City[] = [];

    this.cities.controls.forEach(city => {
      cities.push(city.value);
    });

    if (cities.length > 1) {
      this.cityService.createMany(cities).subscribe(
        response => {
          if (response.success) {
            this.alertService.show(response.message);
            this.closeCityForm.emit(true);
          }
        },
        err => {
          this.alertService.show(err.error.message, 5000);
          this.closeCityForm.emit(true);
        }
      );
    } else {
      this.cityService.create(cities[0]).subscribe(
        response => {
          if (response.success) {
            this.alertService.show(response.message);
            this.closeCityForm.emit(true);
          }
        },
        err => {
          this.alertService.show(err.error.message);
        }
      );
    }
  }
}
