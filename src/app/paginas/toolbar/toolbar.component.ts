import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/paginas/login/services/login.service';
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
export class ToolbarComponent {

  public toolbar: boolean;
  public isMobile: boolean;
  public menu: Array<Imenu> = [
    {
      path: '/pagamento',
      nome: 'Registrar/Consultar Pagamentos'
    },
    // {
    //   path: '/sobre',
    //   nome: 'Sobre'
    // },
  ];

  constructor(
    public toolbarService: ToolbarService,
    public loginService: LoginService,
    public router: Router,
  ) {

    this.toolbarService.getToolbar.subscribe((value: boolean) => {
      this.toolbar = value;
    });
  }

  capturarTamanhoTela(event: { target: { innerWidth: number; }; }): void {
    this.toolbarService.mobile = event.target.innerWidth <= 768;
  }
}
