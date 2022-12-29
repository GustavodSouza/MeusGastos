import { CalculoService } from '../../../shared/utils/calculo.service';
import { LoaderPagamentosService } from './../loader-pagamentos/loader-pagamentos.service';
import { SnackbarService } from '../snackbar/snackbar.service';
import { MomentService } from '../../../shared/utils/moment.service';
import { PagamentoService } from './../../../paginas/pagamento/services/pagamento.service';
import { Meses } from './../../../paginas/pagamento/interface/mes.interface';
import { Pagamentos } from './../../../paginas/pagamento/interface/pagamento.interface';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seletor-datas',
  templateUrl: './seletor-datas.component.html',
  styleUrls: ['./seletor-datas.component.scss']
})
export class SeletorDatasComponent implements OnInit {

  mesAtualIndice = 0;
  anoAtualIndice = 0;
  mesSelecionado = '';
  anoSelecionado = '';

  meses: Meses = this.pagamentoService.obterMeses();
  anos = this.pagamentoService.obterAno();

  @Output() dinheiroTotal = new EventEmitter();
  @Output() lista = new EventEmitter();

  public icones = {
    faArrowCircleLeft,
    faArrowCircleRight
  };

  constructor(
    private pagamentoService: PagamentoService,
    private momentService: MomentService,
    private snackBarService: SnackbarService,
    private loaderPagamentosService: LoaderPagamentosService,
    private calculoService: CalculoService
  ) { }

  ngOnInit(): void {
    this.obterIndiceMesAnoAtual();
  }

  /**
   * @description Método utilizado para mover o indice e alterar o mês referencia
   * @param direcao Parametro em String que recebe uma direção para mover o indice
   */
   async mudarMes(direcao: string): Promise<void> {
    if (direcao === 'mesAnterior') {
      if (this.mesAtualIndice !== 0) {
        this.mesAtualIndice += - 1;
      }
    } else {
      if (this.mesAtualIndice < this.meses.length - 1) {
        this.mesAtualIndice += + 1;
      }
    }
    this.loaderPagamentosService.loaderAtivo = true;
    this.mesSelecionado = this.meses[this.mesAtualIndice].valor;
    this.buscarPorMesAno();
  }


  /**
   * @description Método utilizado para mover o indice e alterar o ano referencia
   * @param direcao Parametro em String que recebe uma direção para mover o indice
   */
  async mudarAno(direcao: string): Promise<void> {
    if (direcao === 'anoAnterior') {
      if (this.anoAtualIndice !== 0) {
        this.anoAtualIndice += - 1;
      }
    } else {
      if (this.anoAtualIndice < this.meses.length - 1) {
        this.anoAtualIndice += + 1;
      }
    }
    this.loaderPagamentosService.loaderAtivo = true;
    this.anoSelecionado = this.anos[this.anoAtualIndice].nome;
    this.buscarPorMesAno();
  }

  /**
   * @description Método utilizado para obter o mês atual
   *
   */
  private obterIndiceMesAnoAtual() {
    const mesAtualPorExtenso = this.momentService.obterMesPorExtenso(new Date);
    const anoAtual = this.momentService.obterDataQuebrada(new Date).ano;

    this.meses.forEach((mes, indice) => {
      if (mes.nome.toLocaleLowerCase() === mesAtualPorExtenso) {
        this.mesAtualIndice = indice;
        this.mesSelecionado = this.meses[this.mesAtualIndice].valor;
      }
    });

    this.anos.forEach((ano, indice) => {
      if (anoAtual == ano.nome) {
        this.anoAtualIndice = indice;
        this.anoSelecionado = this.anos[this.anoAtualIndice].nome;
      }
    });
  }

  get retornaMesAtual(): string {
    return this.meses[this.mesAtualIndice].nome;
  }

  get retornaAnoAtual(): string {
    return this.anos[this.anoAtualIndice].nome;
  }

  private buscarPorMesAno() {
    this.pagamentoService.filtrarMesAno(this.mesSelecionado, this.anoSelecionado).subscribe((response: Pagamentos) => {

      if (!response.length) {
        this.snackBarService.showSnackbar(`Nenhum pagamento registrado para o Mês ${this.mesSelecionado} de ${this.anoSelecionado}`);
      }

      this.dinheiroTotal.emit(this.calculoService.calcularTotalPagamentos(response));
      this.lista.emit(response);
      this.loaderPagamentosService.loader = false;
    });
  }
}
