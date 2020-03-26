import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../services/alert.service';
import { CityService } from './city.service';
import { City } from '../shared/models/city.model';
import { ModalBasicComponent } from '../shared/components/modal-basic/modal-basic.component';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html'
})
export class CityComponent implements OnInit {
  showCityForm = false;

  constructor(
    public dialog: MatDialog,
    private alertService: AlertService,
    private cityService: CityService
  ) {}

  ngOnInit() {}

  toggleCityForm(event): void {
    this.showCityForm = event;
  }

  deleteCity(city: City): void {
    const dialogRef = this.dialog.open(ModalBasicComponent, {
      width: '400px',
      data: {
        title: 'Deletar Cidade',
        body: `Você realmente deseja detelar esta Cidade?`
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.cityService.delete(city._id).subscribe(
          response => {
            if (response.success) {
              this.alertService.show(response.message);
            }
          },
          err => {
            this.alertService.show(err.error.message);
          }
        );
      }
    });
  }
}
