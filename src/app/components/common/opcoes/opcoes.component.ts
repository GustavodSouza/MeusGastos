import { TabelaService } from './../tabela/tabela.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-opcoes',
  templateUrl: './opcoes.component.html',
  styleUrls: ['./opcoes.component.scss']
})
export class OpcoesComponent implements OnInit {

  ocultarDados = true;

  constructor(
    private tabelaService: TabelaService
  ) {
    this.ocultarDados = this.tabelaService.ocultar;
  }

  ngOnInit(): void {
  }

  mostrarEsconderPrecos() {
    this.ocultarDados = !this.ocultarDados;
    this.tabelaService.ocultar = this.ocultarDados;
  }

}
