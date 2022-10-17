import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  isAtivo = false;
  referencia: ElementRef;

  set setEstadoMenu(valor: boolean) {
    this.isAtivo = valor;
  }

  get getEstadoMenu(): boolean {
    return this.isAtivo;
  }

  set setEstadoReference(valor: ElementRef) {
    this.referencia = valor;
  }

  get getEstadoReference(): ElementRef {
    return this.referencia;
  }
}
