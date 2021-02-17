import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { PerfilService } from 'src/app/shared/services/perfil.service';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public isUsuarioLogado = false;
  public nomeUsuarioLogado = this.perfilService.getPerfil()?.user?.displayName ?? null;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private perfilService: PerfilService,
  ) { }

  async logarContaGoogle(): Promise<boolean> {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.firebaseAuth.signInWithPopup(provider).then((result: any) => {
      this.isUsuarioLogado = true;
      this.perfilService.setPerfil(result);
      this.nomeUsuario = this.perfilService.getPerfil()?.user?.displayName;
    });

    return this.isUsuarioLogado;
  }

  public logout(): void {
    this.firebaseAuth.signOut();
    this.perfilService.removePerfil();
    window.location.reload();
  }

  get nomeUsuario(): string {
    return this.nomeUsuarioLogado;
  }

  set nomeUsuario(valor: string) {
    this.nomeUsuarioLogado = valor;
  }
}