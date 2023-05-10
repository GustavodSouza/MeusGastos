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
    return this.dialog.open(TCtor, data);
  }

  abrirDialogo<T>(componente: any, data: T): MatDialogRef<any, any> {
    return this.constroiDialogo(componente, {
      data
    });
  }
}
