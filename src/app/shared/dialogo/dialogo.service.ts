import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogoService {

  constructor(private dialog: MatDialog) {}

  private constroiDialogo<T>(
    TCtor: new (...args: any[]) => T,
    data: any
  ): MatDialogRef<T, any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(TCtor, data);
    return dialogRef;
  }

  abrirDialogo<T>(componente: any, data: T): MatDialogRef<any, any> {
    const dialogRef = this.constroiDialogo(componente, {
      data
    });

    return dialogRef;
  }
}
