 import { PerfilService } from 'src/app/shared/services/perfil.service';
 import { Injectable } from '@angular/core';
 import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
 import { Observable } from 'rxjs';
import { MenuService } from '../shared/components/menu/menu.service';

 @Injectable({
    providedIn: 'root'
  })
  export class RouteGuardService implements CanActivate {


    constructor(
      private router: Router,
      private perfilService: PerfilService,
      private menuService: MenuService
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const user = this.perfilService.getPerfil();

      const rotasRestritas = ['/pagamento'];

      // Controla a regra de acesso as páginas restritas
      if (rotasRestritas.includes(state.url) && user === null) {
        this.router.navigate(['entrar']);
        return false;
      }

      return true;
    }
  }
