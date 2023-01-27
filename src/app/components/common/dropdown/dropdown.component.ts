import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Meses } from 'src/app/paginas/pagamento/interface/mes.interface';
import { Pagamentos } from 'src/app/paginas/pagamento/interface/pagamento.interface';
import { PagamentoService } from 'src/app/paginas/pagamento/services/pagamento.service';
import { CalculoService } from 'src/app/shared/utils/calculo.service';
import { MomentService } from 'src/app/shared/utils/moment.service';
import { LoaderPagamentosService } from '../loader-pagamentos/loader-pagamentos.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  mesAtualIndice = 0;
  anoAtualIndice = 0;
  mesSelecionado = '';
  anoSelecionado = '';

  meses: Meses = this.pagamentoService.obterMeses();
  anos = this.pagamentoService.obterAno();

  @Output() dinheiroTotal = new EventEmitter();
  @Output() lista = new EventEmitter();

  constructor(
    private momentService: MomentService,
    private pagamentoService: PagamentoService,
    private snackBarService: SnackbarService,
    private calculoService: CalculoService,
    private loaderPagamentosService: LoaderPagamentosService,
  ) { }

  ngOnInit(): void { 
    this.obterIndiceMesAnoAtual();
  }

  private obterIndiceMesAnoAtual(): void {
    const mesAtualPorExtenso = this.momentService.obterMesPorExtenso(new Date());
    const anoAtual = this.momentService.obterDataQuebrada(new Date()).ano;

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

  changeAno(value: any): void {
    this.anoSelecionado = value;
    this.buscarPorMesAno();
  }

  changeMes(value: any): void {
    this.mesSelecionado = value;
    this.buscarPorMesAno();
  }

  public buscarPorMesAno(): void {
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
