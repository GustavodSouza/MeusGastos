import { EditarPagamentoComponent } from './editar-pagamento/editar-pagamento.component';
import { PerfilService } from '../../shared/utils/perfil.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentService } from 'src/app/shared/utils/moment.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PagamentoService } from './services/pagamento.service';
import { CalculoService } from 'src/app/shared/utils/calculo.service';
import { Pagamento, Pagamentos } from './dto/pagamento';
import { ConfirmarDialogComponent } from './confirmar/confirmar.component';
import { LoaderService } from 'src/app/components/common/loader/loader.service';
import { TabelaService } from 'src/app/components/common/tabela/tabela.service';
import * as _ from 'lodash';
import { DialogoService } from 'src/app/shared/dialogo/dialogo.service';
import { faCalendarAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { ToolbarService } from '../toolbar/service/toolbar.service';
import { UsuarioService } from 'src/app/shared/utils/usuario.service';
import { LoginService } from '../login/services/login.service';
import { Meses } from './dto/mes';
import { Anos } from './dto/anos';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss'],
})
export class PagamentoComponent implements OnInit {

  response: Pagamentos;
  formulario: FormGroup;
  dinheiroTotal: number = 0;
  colunas: Array<string> = ['descricao', 'preco', 'dataPagamento', 'acoes'];
  dados: Pagamentos;
  listaAuxiliar: Pagamentos;
  dataAtual = new Date();
  isOcultarValor: boolean;

  icones = {
    faCalendarAlt,
    faDollarSign
  };

  meses: Meses = this.pagamentoService.obterMeses();
  anos: Anos = this.pagamentoService.obterAno();

  anoAtual = this.momentService.obterDataQuebrada(new Date()).ano;
  mesAtual = this.momentService.obterDataQuebrada(new Date()).mes;

  constructor(
    private pagamentoService: PagamentoService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
    private perfilService: PerfilService,
    private calculoService: CalculoService,
    public momentService: MomentService,
    public dialog: MatDialog,
    public dialogRefConfirm: MatDialogRef<ConfirmarDialogComponent>,
    public tabelaService: TabelaService,
    private dialogoService: DialogoService,
    private toolbarService: ToolbarService,
    private usuarioService: UsuarioService,
    private loginService: LoginService
  ) {
    this.tabelaService.getOcultarValor.subscribe((valor) => this.isOcultarValor = valor);
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.buscarTodosPagamentos();
    this.toolbarService.mostrarToolbar();
    this.loginService.primeiraLetraNome.next(this.usuarioService.obterPrimeiraLetraNome(this.loginService.nomeUsuario));
  }

  public inicializarFormulario(): void {
    this.formulario = this.formBuilder.group({
      id: [''],
      descricao: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      preco: ['', Validators.required],
      dataPagamento: ['', Validators.required],
      uidUser: ['']
    });
  }

  public buscarTodosPagamentos(): void {
    this.loaderService.ativarLoader();

    this.pagamentoService.buscarTodosPagamentos().subscribe((response: Pagamentos) => {

      this.listaAuxiliar = response;
      this.dados = this.listaAuxiliar;

      this.dinheiroTotal = this.calculoService.calcularTotalPagamentos(this.listaAuxiliar);

      this.loaderService.desativarLoader();
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
        if (!pagamento) {
          return;
        }
        
        this.pagamentoService.atualizarPagamento(pagamento.key, pagamento.data);
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

  private obterPagamentosPorMesAno(): void {
    this.loaderService.ativarLoader();
    
    this.pagamentoService.filtrarMesAno(this.mesAtual, this.anoAtual).subscribe((response: Pagamentos) => {
      this.listaAuxiliar = response;
      this.dados = this.listaAuxiliar;

      this.dinheiroTotal = this.calculoService.calcularTotalPagamentos(this.listaAuxiliar);

      this.loaderService.desativarLoader();
    });
  }

  limparFormulario(): void {
    this.formulario.reset();
  }

  toogleVisibilidadeValor(): void {
    this.tabelaService.setOcultarValor = !this.isOcultarValor;
  }

  get form() {
    return this.formulario.controls;
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

  set setMesFiltrado(valor: string) {
    this.mesAtual = valor;
    this.obterPagamentosPorMesAno();
  }

  set setAnoFiltrado(valor: string) {
    this.anoAtual = valor;
    this.obterPagamentosPorMesAno();
  }
}

