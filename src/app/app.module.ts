import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { AuthHeaderInterceptor } from './interceptors/header.interceptor';
import { CatchErrorInterceptor } from './interceptors/http-error.interceptor';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { ApiService } from './services/api.service';
import { ModalBasicComponent } from './shared/components/modal-basic/modal-basic.component';
import { CityFormComponent } from './city/city-form/city-form.component';
import { CityListComponent } from './city/city-list/city-list.component';
import { CityService } from './city/city.service';
import { StateService } from './state/state.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ModalBasicComponent,
    HomeComponent,
    StateComponent,
    CityComponent,
    CityFormComponent,
    CityListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeaderInterceptor,
      multi: true,
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchErrorInterceptor,
      multi: true,
    },
    ApiService,
    CityService,
    StateService
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
