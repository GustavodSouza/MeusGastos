import { MomentService } from '../../../shared/utils/moment.service';
import { Pagamento } from 'src/app/paginas/pagamento/dto/pagamento';
import { PagamentoService } from './../services/pagamento.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-editar-pagamento',
  templateUrl: './editar-pagamento.component.html',
  styleUrls: ['./editar-pagamento.component.scss']
})
export class EditarPagamentoComponent implements OnDestroy {

  formulario: FormGroup;
  $subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditarPagamentoComponent>,
    private pagamentoService: PagamentoService,
    private formBuilder: FormBuilder,
    private momentService: MomentService
    ) {
      this.inicializarFormulario();
      this.preencherInputs();
  }

  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }

  inicializarFormulario(): void {
    this.formulario = this.formBuilder.group({
      id: [''],
      descricao: ['', [Validators.required, Validators.minLength(2)]],
      preco: ['', Validators.required],
      dataPagamento: ['', Validators.required],
      uidUser: ['']
    });
  }

  preencherInputs() {
    this.$subscription = this.pagamentoService.buscarPagamentoPorId(this.data.dataDoItem, this.data.key).subscribe((pagamento: Pagamento) => {

      let dataMontada: Date;

      if (pagamento.dataPagamento) {
        const parts = pagamento.dataPagamento.split('/');

        dataMontada = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
      }

      this.formulario.patchValue({
        descricao: pagamento.descricao,
        preco: pagamento.preco,
        dataPagamento: dataMontada
      })
    });
  }

  salvarPagamento() {

    if (typeof this.formulario.value.dataPagamento !== 'string') {
      this.formulario.value.dataPagamento = this.momentService.dateFormatBR(this.formulario.value.dataPagamento);
    }

    if (this.formulario.valid) {
      this.pagamentoService.atualizarPagamento(this.data.key, this.formulario.value)
      this.fecharDialogo();
    }
  }

  fecharDialogo() {
    this.dialogRef.close();
  }
}
