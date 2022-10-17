import { MomentService } from '../../../../shared/services/moment.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, ViewChild } from '@angular/core';
import { PagamentoService } from '../../services/pagamento.service';
import { Pagamento } from '../../interface/pagamento.interface';

@Component({
  selector: 'app-editar-pagamento',
  templateUrl: './editar-pagamento.component.html',
  styleUrls: ['./editar-pagamento.component.scss']
})
export class EditarDialogComponent {

  public preco: number;

  @ViewChild('picker') public picker = ViewChild;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarDialogComponent>,
    private pagamentoService: PagamentoService,
    private momentService: MomentService,
  ) {
    this.preencherFormulario();
  }

  public atualizarPagamento(): void {
    if (this.data.formulario.valid) {

      const isSubtrair = (this.preco < this.data.formulario.value.preco);

      /* Obtem a diferença dos valores para ser somado ou subtraido do valor atual */
      const diferencaEntreValores = Math.abs(this.data.formulario.value.preco - this.preco);

      this.data.formulario.value.dataPagamento = this.momentService.dateFormatBR(this.data.formulario.value.dataPagamento);

      this.dialogRef.close(
        {
          key: this.data.key,
          data: this.data.formulario.value,
          isSubtrair,
          diferencaEntreValores
        });
    } else {
      return;
    }
  }

  public async preencherFormulario(): Promise<void> {

    (await this.pagamentoService.buscarPagamentoPorId(this.data.dataDoItem, this.data.key)).subscribe((pagamento: Pagamento) => {
      this.preco = pagamento?.preco;

      const parts = pagamento.dataPagamento.split('/');

      const dataMontada = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));

      this.data.formulario.patchValue({
        descricao: pagamento.descricao,
        preco: pagamento.preco,
        dataPagamento: dataMontada,
        uidUser: pagamento.uidUser,
      });
    });
  }
}
