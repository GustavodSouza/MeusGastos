import { EventEmitter } from '@angular/core';
import { Pagamento, Pagamentos } from 'src/app/paginas/pagamento/interface/pagamento.interface';
import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-filtro',
  templateUrl: './input-filtro.component.html',
  styleUrls: ['./input-filtro.component.scss']
})
export class InputFiltroComponent {

  listaAuxiliar: Pagamentos;
  @Input() dados: Pagamentos;
  @Output() listaFiltrada = new EventEmitter();

  constructor() {}

  /**
  * @description Método utilizado para filtrar a lista da tabela
  */
  set filtrar(valor: string) {
    this.listaAuxiliar = this.dados.filter((item: Pagamento) =>
    item.descricao.toLowerCase().includes(valor.toLowerCase()));

    this.listaFiltrada.emit(this.listaAuxiliar);
  }
}
