import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private snackbar: MatSnackBar,
  ) {}

  show(message: string, duration?: number) {
    const snackDuration = duration ? duration : 3000;
    this.snackbar.open(message, '', { duration: snackDuration });
  }
}
