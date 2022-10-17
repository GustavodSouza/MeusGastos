import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
@Injectable()
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  public itemsPerPageLabel = 'Itens por página';
  // Botao de proximo
  public nextPageLabel = 'Próximo';
  // Botao de anterior
  public previousPageLabel = 'Anterior';

  public getRangeLabel = function (page: any, pageSize: any, length: any): string {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const indexInicial = page * pageSize;
    const indexFinal = indexInicial < length ?
      Math.min(indexInicial + pageSize, length) :
      indexInicial + pageSize;
    return indexInicial + 1 + ' - ' + indexFinal + ' de ' + length;
  };
}
