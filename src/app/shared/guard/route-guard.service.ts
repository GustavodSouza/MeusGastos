import { LoginService } from '../../paginas/login/services/login.service';
import { PerfilService } from 'src/app/shared/utils/perfil.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { ToolbarService } from 'src/app/paginas/toolbar/service/toolbar.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(
    private router: Router,
    private perfilService: PerfilService,
    private toolbarService: ToolbarService,
    private loginService: LoginService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = this.perfilService.getPerfil();
    const rotasValidas = ['/', '/entrar', '/pagamento', '/sobre', '/editar-perfil'];
    const rotasLogin = ['/', '/entrar'];
    const rotasRestritas = ['/pagamento'];

    if (rotasLogin.includes(state.url) || !rotasValidas.includes(state.url)) {
      this.toolbarService.setEsconderToolbar = true;
    } else {
      this.toolbarService.setEsconderToolbar = false;
      this.loginService.primeiraLetraNome.next(this.obterPrimeiraLetraNome());
    }

    // Se a rota for restrita e o usuário não estiver logado, redireciona para o login
    if (rotasRestritas.includes(state.url) && _.isNil(user)) {
      this.router.navigate(['entrar']);
      return false;
    }

    return true;
  }

  obterPrimeiraLetraNome(): string {
    let posicaoUltimoEspaco: number;
    let primeiraLetraPrimeiroNome = '';
    let primeiraLetraUltimoNome = '';

    if (this.loginService.nomeUsuario) {
      posicaoUltimoEspaco = this.loginService.nomeUsuario.lastIndexOf(' ');
      primeiraLetraPrimeiroNome = this.loginService.nomeUsuario.substring(0, 1);
      primeiraLetraUltimoNome = this.loginService.nomeUsuario.substring(posicaoUltimoEspaco + 1, posicaoUltimoEspaco + 2);
    }

    return primeiraLetraPrimeiroNome + primeiraLetraUltimoNome;
  }
}
