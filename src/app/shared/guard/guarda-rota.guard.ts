import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PerfilService } from '../utils/perfil.service';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class GuardaRotaGuard implements CanActivate {

  constructor(
    private perfilService: PerfilService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const rotasRestritas = ['/pagamento'];

      if (rotasRestritas.includes(state.url) && _.isNil(this.perfilService.getPerfil())) {
        this.router.navigate(['entrar']);
        return false;
      }
    
      return true;
  }
}
