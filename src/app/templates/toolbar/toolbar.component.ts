import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/paginas/login/services/login.service';
import { MenuService } from 'src/app/components/common/menu/menu.service';
import { ToolbarService } from './service/toolbar.service';

interface Imenu {
  path: string;
  nome: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy {

  public hamburguerActive = false;
  public nomeResumido: string;
  public esconderToolbar: boolean;
  $subscription;

  public menu: Array<Imenu> = [
    {
      path: '/pagamento',
      nome: 'Registrar/Consultar Pagamentos'
    },
    {
      path: '/sobre',
      nome: 'Sobre'
    },
  ];

  constructor(
    public toolbarService: ToolbarService,
    public loginService: LoginService,
    public router: Router,
    public menuService: MenuService,
  ) {

    this.$subscription = this.toolbarService.getEsconderToolbar.subscribe((esconder: boolean) => {
      this.esconderToolbar = esconder;
    });

    this.$subscription = this.loginService.primeiraLetraNome.subscribe((nomeResumido: string) => {
      this.nomeResumido = nomeResumido;
    });
  }

  ngOnDestroy(): void {
    this.$subscription.unsubscribe();
  }

  marcarItemMenu(path?: string): string {
    if (path) {
      return path === this.router.url ? 'manterMarcado' : 'efeitoHover';
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



  logout(): void {
    this.loginService.logout();
  }
}
