import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderPagamentosService {
  
  public loaderAtivo = false;

  constructor() { }

  set loader(valor: boolean) {
    this.loaderAtivo = valor;
  }

  get loader(): boolean {
    return this.loaderAtivo;
  }
}
