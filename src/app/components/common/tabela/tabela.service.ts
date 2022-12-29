import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TabelaService {
  ocultar = false;

  set setOcultar(valor: boolean) {
    this.ocultar = valor;
  }

  get getOcultar(): boolean {
    return this.ocultar;
  }
}
