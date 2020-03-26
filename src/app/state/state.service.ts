import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Injectable()
export class StateService {
  private stateInfoSource = new BehaviorSubject<any>({});
  stateInfo$ = this.stateInfoSource.asObservable();

  constructor(private apiService: ApiService) { }

  loadStateInfo(state) {
    return this.apiService.get(`city/state/${state}`).pipe(
      tap(result => this.stateInfoSource.next(result.data))
    );
  }
}
