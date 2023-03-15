import { EditarPagamentoComponent } from './editar-pagamento/editar-pagamento.component';
import { PerfilService } from '../../shared/utils/perfil.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentService } from 'src/app/shared/utils/moment.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SaldoService } from './services/saldo.service';
import { PagamentoService } from './services/pagamento.service';
import { CalculoService } from 'src/app/shared/utils/calculo.service';
import { MatSelect } from '@angular/material/select';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Pagamento, Pagamentos } from './interface/pagamento.interface';
import { ConfirmarDialogComponent } from './confirmar/confirmar.component';
import { LoaderPagamentosService } from 'src/app/components/common/loader-pagamentos/loader-pagamentos.service';
import { TabelaService } from 'src/app/components/common/tabela/tabela.service';
import * as _ from 'lodash';
import { DialogoService } from 'src/app/shared/dialogo/dialogo.service';
import { faCalendarAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
})
export class PagamentoComponent implements OnInit {

  response: Pagamentos;
  formulario: FormGroup;
  dinheiroTotal = 0;
  key: string;
  colunas: Array<string> = ['descricao', 'preco', 'dataPagamento', 'acoes'];

  salarioRecebidoMes = 0;
  dados: Pagamentos;
  listaAuxiliar: Pagamentos;

  dataAtual = new Date();

  isValorOCulto = false;

  icones = {
    faCalendarAlt,
    faDollarSign
  };

  @ViewChild('inputFiltroDia') inputFiltroDia: ElementRef;
  @ViewChild('inputFiltroMes') inputFiltroMes: MatSelect;
  @ViewChild('expansivelNovoPagamento') expansivelNovoPagamento: MatExpansionPanel;
  @ViewChild('expansivelFiltros') expansivelFiltros: MatExpansionPanel;

  constructor(
    private pagamentoService: PagamentoService,
    private formBuilder: FormBuilder,
    private loaderPagamentosService: LoaderPagamentosService,
    private perfilService: PerfilService,
    private calculoService: CalculoService,
    public momentService: MomentService,
    public dialog: MatDialog,
    public dialogRefConfirm: MatDialogRef<ConfirmarDialogComponent>,
    public saldoService: SaldoService,
    public tabelaService: TabelaService,
    private dialogoService: DialogoService
  ) {}

  public ngOnInit(): void {
    this.inicializarFormulario();
    this.buscarTodosPagamentos();

  }

  public inicializarFormulario(): void {
    this.formulario = this.formBuilder.group({
      id: [''],
      descricao: ['', [Validators.required, Validators.minLength(2)]],
      preco: ['', Validators.required],
      dataPagamento: ['', Validators.required],
      uidUser: ['']
    });
  }

  public async buscarTodosPagamentos(): Promise<void> {
    this.loaderPagamentosService.loader = true;
    (await this.pagamentoService.buscarTodosPagamentos()).subscribe((response: Pagamentos) => {

      this.listaAuxiliar = response;
      this.dados = this.listaAuxiliar;

      this.dinheiroTotal = this.calculoService.calcularTotalPagamentos(this.listaAuxiliar);

      this.loaderPagamentosService.loader = false;
    });
  }


  public deletarPagamento(item: Pagamento): void {

    this.dialogoService.abrirDialogo(ConfirmarDialogComponent, { item: item.descricao }).afterClosed().subscribe(async (retorno) => {
      if (retorno) {
        this.pagamentoService.deletarPagamento(item.key, item);

        this.buscarTodosPagamentos();
      }
    });
  }

  public editarPagamento(itemPagamento: Pagamento): void {

    const data = {
      key: itemPagamento.key,
      dataDoItem: itemPagamento.dataPagamento,
      formulario: this.formulario,
    };


    this.dialogoService.abrirDialogo(EditarPagamentoComponent, data).afterClosed().subscribe((pagamento) => {
        if (pagamento) {
          this.pagamentoService.atualizarPagamento(pagamento.key, pagamento.data);

          if (itemPagamento.dataPagamento !== pagamento.data.dataPagamento) {
            this.pagamentoService.deletarPagamento(itemPagamento.key, itemPagamento);
          }
        }
      });
  }

  public adicionarNovoPagamento(): void {
    const perfilSession = this.perfilService.getPerfil();

    if (this.formulario.valid && !_.isNil(perfilSession)) {

      this.pagamentoService.adicionarNovoPagamento(this.formulario.value);
      this.limparFormulario();
      this.buscarTodosPagamentos();
    }
  }

  limparFormulario(): void {
    this.formulario.reset();
  }

  toogleVisibilidadeValor(): void {
    this.isValorOCulto = !this.isValorOCulto;
    this.tabelaService.ocultar = this.isValorOCulto;
  }

  set setDinheiroTotal(dinheiroTotal: number) {
    this.dinheiroTotal = dinheiroTotal;
  }

  set setPagamentos(pagamentos: Pagamentos) {
    this.listaAuxiliar = pagamentos;
    this.dados = pagamentos;
  }

  set filtrarDescricao(descricao: string) {
    this.listaAuxiliar = this.dados.filter((pagamento) => pagamento.descricao.toLowerCase().indexOf(descricao.toLowerCase()) > -1);
  }
}

