import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  public showSnackbar(content): void {
    this._snackBar.open(content, null, {
      duration: 5000,
    });
  }
}
