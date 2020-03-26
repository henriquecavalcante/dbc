import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { City } from '../shared/models/city.model';

@Injectable()
export class CityService {
  private cityListSource = new BehaviorSubject<City[]>([]);
  cityList$ = this.cityListSource.asObservable();

  constructor(private apiService: ApiService) { }

  loadCities() {
    return this.apiService.get('city').pipe(
      tap(result => this.cityListSource.next(result.data))
    );
  }

  create(city: City) {
    const body = { data: city };

    return this.apiService.post('city', body).pipe(
      tap(() => this.loadCities().subscribe(() => console.log('City created')))
    );
  }

  createMany(cities: City[]) {
    const body = { data: cities };

    return this.apiService.post('city/batch', body).pipe(
      tap(() => this.loadCities().subscribe(() => console.log('Cities created')))
    );
  }

  delete(cityId: string) {
    return this.apiService.delete(`city/${cityId}`).pipe(
      tap(() => this.loadCities().subscribe(() => console.log('City deleted')))
    );
  }
}
