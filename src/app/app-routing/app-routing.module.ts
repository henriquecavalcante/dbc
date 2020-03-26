import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { StateComponent } from '../state/state.component';
import { CityComponent } from '../city/city.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'state',
    component: StateComponent
  },
  {
    path: 'city',
    component: CityComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
