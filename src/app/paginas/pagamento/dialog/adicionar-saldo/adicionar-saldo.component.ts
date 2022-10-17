import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pagamento } from '../../interface/pagamento.interface';
import { PagamentoService } from '../../services/pagamento.service';
import { SaldoService } from '../../services/saldo.service';

@Component({
  selector: 'app-adicionar-saldo',
  templateUrl: './adicionar-saldo.component.html',
  styleUrls: ['./adicionar-saldo.component.scss']
})
export class AdicionarSaldoDialogComponent implements OnInit{

  public formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private saldoService: SaldoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AdicionarSaldoDialogComponent>,
  ) {}

  public ngOnInit(): void {
    this.iniciarFormulario();
    this.preencherFormulario();
  }

  public iniciarFormulario(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      saldo: [null, Validators.required],
    });
  }

  public clear(): void {
    this.formulario.reset();
  }

  public addMoney(): void {
    this.saldoService.atualizarSaldoDoMes(this.data.key, this.formulario.value);
    this.dialogRef.close(this.data.key);
  }

  public async preencherFormulario(): Promise<void> {
    this.formulario.patchValue({
      saldo: this.data?.saldo,
    });
  }
}
