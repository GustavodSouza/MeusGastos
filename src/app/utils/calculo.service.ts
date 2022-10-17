import { Injectable } from '@angular/core';
import { Pagamentos } from '../paginas/pagamento/interface/pagamento.interface';

@Injectable({
  providedIn: 'root',
})
export class CalculoService {

  public calcularTotalPagamentos(data: Pagamentos): number {
    return data.reduce((total, numero) => total + numero.preco, 0);
  }

  public subtrairSaldo(valor1: number, valo2: number): number {
    return valor1 - valo2;
  }

  public somarSaldo(valor1: number, valor2: number): number {
    return valor1 + valor2;
  }
}
