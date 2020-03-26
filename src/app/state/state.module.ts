import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateComponent} from './state.component';
import { SharedModule } from '../shared/shared.module';
import { StateService } from './state.service';

@NgModule({
  declarations: [
    StateComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    StateService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class StateModule {}
