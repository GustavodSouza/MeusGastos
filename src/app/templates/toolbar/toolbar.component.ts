import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/paginas/login/services/login.service';
import { MenuService } from 'src/app/shared/components/menu/menu.service';
import { ToolbarService } from './service/toolbar.service';

interface Imenu {
  path: string;
  nome: string;
}

enum variaveis {
  LOGIN = 'Login',
}
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  public hamburguerActive = false;

  public menu: Array<Imenu> = [
    {
      path: '/pagina-inicial',
      nome: 'Início'
    },
    {
      path: '/pagamento',
      nome: 'Registrar/Consultar Pagamentos'
    },
  ];

  constructor(
    public toolbarService: ToolbarService,
    public loginService: LoginService,
    public router: Router,
    public menuService: MenuService,
  ) {}

  marcarItemMenu(path?: string): string {
    if (path) {
      return path === this.router.url ? 'manterMarcado' : 'efeitoHover';
    } else {
      return this.router.url === '/entrar' ? 'manterMarcado' : 'efeitoHover';
    }
  }

  capturarTamanhoTela(event: { target: { innerWidth: number; }; }): void {
    this.toolbarService.mobile = event.target.innerWidth <= 768;
  }

  redirecionar(rota: string): void {
    this.desativarMenu();
    this.router.navigateByUrl(rota);
  }

  desativarMenu(): void {
    this.menuService.isAtivo = false;
    this.menuService.referencia.nativeElement.classList.value = '';
  }
}
