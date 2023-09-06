import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  
  public loaderAtivo = false;

  constructor() { }

  set loader(valor: boolean) {
    this.loaderAtivo = valor;
  }

  get loader(): boolean {
    return this.loaderAtivo;
  }

  ativarLoader(): void {
    this.loader = true;
  }

  desativarLoader(): void {
    this.loader = false;
  }
}
