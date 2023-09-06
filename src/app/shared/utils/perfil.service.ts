import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  readonly PERFIL = 'USER_PERFIL';

  constructor() { }

  public getPerfil(): any {
    return JSON.parse(sessionStorage.getItem(this.PERFIL));
  }

  public setPerfil(perfil): void {
    sessionStorage.setItem(this.PERFIL, JSON.stringify(perfil));
  }

  public removePerfil(): void {
    sessionStorage.removeItem(this.PERFIL);
  }
}
