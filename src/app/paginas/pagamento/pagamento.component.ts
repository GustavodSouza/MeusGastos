import { SnackbarService } from '../../shared/components/snackbar/snackbar.service';
import { PerfilService } from '../../shared/services/perfil.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentService } from 'src/app/shared/services/moment.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SaldoService } from './services/saldo.service';
import { PagamentoService } from './services/pagamento.service';
import { CalculoService } from 'src/app/utils/calculo.service';
import { MatSelect } from '@angular/material/select';
import { MatExpansionPanel } from '@angular/material/expansion';
import { Pagamento, Pagamentos } from './interface/pagamento.interface';
import { ConfirmarDialogComponent } from './dialog/confirmar/confirmar.component';
import { EditarDialogComponent } from './dialog/editar-pagamento/editar-pagamento.component';
import { LoaderPagamentosService } from 'src/app/components/common/loader-pagamentos/loader-pagamentos.service';
import { TabelaService } from 'src/app/components/common/tabela/tabela.service';
import * as _ from 'lodash';

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
  diaAtual = new Date();
  dados: Pagamentos;
  listaAuxiliar: Pagamentos;

  @ViewChild('inputFiltroDia') inputFiltroDia: ElementRef;
  @ViewChild('inputFiltroMes') inputFiltroMes: MatSelect;
  @ViewChild('expansivelNovoPagamento') expansivelNovoPagamento: MatExpansionPanel;
  @ViewChild('expansivelFiltros') expansivelFiltros: MatExpansionPanel;

  constructor(
    private pagamentoService: PagamentoService,
    private formBuilder: FormBuilder,
    private loaderPagamentosService: LoaderPagamentosService,
    private perfilService: PerfilService,
    private snackBarService: SnackbarService,
    private calculoService: CalculoService,
    public momentService: MomentService,
    public dialog: MatDialog,
    public dialogRefConfirm: MatDialogRef<ConfirmarDialogComponent>,
    public dialogRefEdit: MatDialogRef<EditarDialogComponent>,
    public saldoService: SaldoService,
    public tabelaService: TabelaService,
  ) {}

  public ngOnInit(): void {
    this.inicializarFormulario();
    this.buscarTodosPagamentos();
    // this.buscarSaldoDoMes();

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

      this.dinheiroTotal = this.calculoService.calcularTotalPagamentos(this.listaAuxiliar);

      this.loaderPagamentosService.loader = false;
    });
  }


  public deletarPagamento(item: Pagamento): void {

    this.dialog.open(ConfirmarDialogComponent, {
      data: {
        item: item.descricao
      },
    }).afterClosed().subscribe(async (retorno) => {
      if (retorno) {
        this.pagamentoService.deletarPagamento(item.key, item);

        this.buscarTodosPagamentos();

        // TODO: Consertar

        // if (this.salarioRecebidoMes !== 0) {
        //   const novoValor = this.calculoService.somarSaldo(this.salarioRecebidoMes, item.preco);

        //   this.saldoService.atualizarSaldoDoMes(this.key, { saldo: novoValor } as Saldo);
        // }
      }
    });
  }

  public editarPagamento(itemPagamento: Pagamento): void {
    this.dialog.open(EditarDialogComponent, {
      data: {
        key: itemPagamento.key,
        dataDoItem: itemPagamento.dataPagamento,
        formulario: this.formulario,
      }
    }).afterClosed().subscribe((pagamento) => {
      if (pagamento) {
        this.pagamentoService.atualizarPagamento(pagamento.key, pagamento.data);

        // TODO: Comparar dia e ano

        // if (itemPagamento.dataPagamento !== pagamento.data.dataPagamento) {
        //   this.pagamentoService.deletarPagamento(itemPagamento.key, itemPagamento);
        // }

        // if (this.salarioRecebidoMes) {
        //   const total = (pagamento.isSubtrair) ?
        //     this.calculoService.subtrairSaldo(this.salarioRecebidoMes, pagamento.diferencaEntreValores) :
        //     this.calculoService.somarSaldo(this.salarioRecebidoMes, pagamento.diferencaEntreValores);
        //   this.saldoService.atualizarSaldoDoMes(this.key, { saldo: total } as Saldo);
        // }

       //  this.definirConsulta(itemPagamento.dataPagamento);
      }
    });
  }

  public adicionarNovoPagamento(): void {
    const perfilSession = this.perfilService.getPerfil();

    if (this.formulario.valid && !_.isNil(perfilSession)) {

      this.pagamentoService.adicionarNovoPagamento(this.formulario.value);
      this.limparFormulario();
      this.buscarTodosPagamentos();

     // this.definirConsulta(this.formulario.value.dataPagamento);

      // if (this.salarioRecebidoMes) {
      //   const total = this.calculoService.subtrairSaldo(this.salarioRecebidoMes, this.formulario.value.preco);
      //   this.saldoService.atualizarSaldoDoMes(this.key, { saldo: total } as Saldo);
      // }
    }
  }

  // private definirConsulta(data: any): void {
  //   if (this.mesFiltrado) {
  //     this.filtrarPorMes('', data);
  //   } else {
  //     this.buscarTodosPagamentos();
  //   }
  // }

  limparFormulario(): void {
    this.formulario.reset();
  }

  // public validCurrentMoney(): string {
  //   return Math.sign(this.salarioRecebidoMes) === 1 ? 'positive' : 'negative';
  // }

  // async buscarSaldoDoMes(): Promise<void> {

  //   (await this.saldoService.buscarSaldoDoMes()).subscribe((saldo: Saldos) => {
  //     const saldoCorrente: Saldos = saldo.filter((filter: Saldo) =>
  //       this.momentService.obterDataQuebrada(filter.data).mes === this.momentService.obterDataQuebrada(new Date()).mes);

  //     if (!saldo.length || !saldoCorrente.length) {
  //       this.saldoService.criarSaldoDoMes(); // Se não existe, cria o saldo
  //     } else if (this.momentService.obterDataQuebrada(saldoCorrente[0]?.data).mes ===
  //       this.momentService.obterDataQuebrada(new Date()).mes) {
  //       this.salarioRecebidoMes = saldoCorrente[0]?.saldo;
  //       this.key = saldoCorrente[0]?.key;
  //     }
  //   });
  // }
  // addMoney(): void {
  //   this.dialog.open(AdicionarSaldoDialogComponent, {
  //     data: {
  //       key: this.key,
  //       saldo: this.salarioRecebidoMes
  //     }
  //   }).afterClosed().subscribe((response) => {
  //     if (response) {
  //       const total = this.calculoService.subtrairSaldo(this.salarioRecebidoMes, this.dinheiroTotal);

  //       this.saldoService.atualizarSaldoDoMes(this.key, { saldo: total } as Saldo);
  //     }
  //   });
  // }

  // removeCurrentMoney(): void {
  //   this.saldoService.deletarSaldoDoMes(this.key);
  // }

  /**
   * @description Método utilizado para filtrar a lista da tabela
   */
  set filtrar(valor: string) {
    this.listaAuxiliar = this.dados.filter((item: Pagamento) =>
      item.descricao.toLowerCase().includes(valor.toLowerCase()));
  }

  set setDinheiroTotal(dinheiroTotal: number) {
    this.dinheiroTotal = dinheiroTotal;
  }

  set setPagamentos(pagamentos: Pagamentos) {
    this.listaAuxiliar = pagamentos;
  }

}

