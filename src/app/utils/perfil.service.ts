import { PerfilConstant } from '../shared/constant/perfil-constant';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor() { }

  public getPerfil(): any {
    return JSON.parse(sessionStorage.getItem(PerfilConstant.PERFIL));
  }

  public setPerfil(perfil): void {
    sessionStorage.setItem(PerfilConstant.PERFIL, JSON.stringify(perfil));
  }

  public removePerfil(): void {
    sessionStorage.removeItem(PerfilConstant.PERFIL);
  }
}
