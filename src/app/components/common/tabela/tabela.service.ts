import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TabelaService {

  ocultarValor = new BehaviorSubject(false);

 // ocultar = false;

  set setOcultarValor(valor: boolean) {
    this.ocultarValor.next(valor);
  }

  get getOcultarValor(): Observable<boolean> {
    return this.ocultarValor.asObservable();
  }

  // set setOcultar(valor: boolean) {
  //   this.ocultar = valor;
  // }

  // get getOcultar(): boolean {
  //   return this.ocultar;
  // }
}
