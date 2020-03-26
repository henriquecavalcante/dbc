import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityComponent } from './city.component';
import { CityService } from './city.service';
import { CityFormComponent } from './city-form/city-form.component';
import { CityListComponent } from './city-list/city-list.component';

@NgModule({
  declarations: [CityComponent, CityFormComponent, CityListComponent],
  imports: [CommonModule],
  providers: [CityService]
})
export class CitysModule {}
