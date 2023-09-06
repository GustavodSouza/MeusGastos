import { ConfirmarDialogComponent } from '../../paginas/pagamento/confirmar/confirmar.component';
import { EditarPagamentoComponent } from './../../paginas/pagamento/editar-pagamento/editar-pagamento.component';
import { MatDialogRef } from '@angular/material/dialog';
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appTeclaPressionada]'
})
export class TeclaPressionadaDirective {

  constructor(
    public dialogRefEditar: MatDialogRef<EditarPagamentoComponent>,
    public dialogRefConfirmar: MatDialogRef<ConfirmarDialogComponent>
  ) { }

  @HostListener('window:keydown.escape', ['$event']) handleKeyDown(event: KeyboardEvent) {
    if (event) {
      this.dialogRefConfirmar.close();
      this.dialogRefEditar.close();
    }
  }
}
