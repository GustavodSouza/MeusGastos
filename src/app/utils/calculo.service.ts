import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculoService {

  public calcularTotalPagamentos(data): number {
    return data.reduce((total, numero) => total + parseInt(numero.preco), 0);
  }

  public subtrairSaldo(valor1: number, valo2: number): number {
    return valor1 - valo2;
  }

  public somarSaldo(valor1: number, valor2: number): number {
    return valor1 + valor2;
  }
}
