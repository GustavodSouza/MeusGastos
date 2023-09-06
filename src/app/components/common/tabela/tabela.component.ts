import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, Type, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Pagamento } from 'src/app/paginas/pagamento/dto/pagamento';
import { TabelaService } from './tabela.service';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnChanges {
  @Input() dados: Type<any>;
  @Input() colunas: Array<string>;
  @Output() editarEmit = new EventEmitter();
  @Output() deletarEmit = new EventEmitter();
  @ViewChild(MatPaginator) public paginacao: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listaFiltrada = new MatTableDataSource<Pagamento>();

  isOcultarValor$ = this.tabelaService.getOcultarValor;

  constructor(
    public tabelaService: TabelaService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.listaFiltrada.data = changes.dados.currentValue;
    this.listaFiltrada.paginator = this.paginacao;
    this.listaFiltrada.sort = this.sort;
  }

  editar<T>(dados: T): void {
    this.editarEmit.emit(dados);
  }

  deletar<T>(dados: T): void {
    this.deletarEmit.emit(dados);
  }
}
