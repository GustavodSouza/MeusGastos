import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/services/login.service';
@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.scss']
})
export class PaginaInicialComponent {
  public nomeUsuario = null;

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {
    this.nomeUsuario = this.loginService.nomeUsuario ?? null;
  }

  usuarioLogado(): void {
    if (this.nomeUsuario !== null) {
      this.router.navigateByUrl('pagamento');
    } else {
      this.router.navigateByUrl('entrar');
    }
  }
}
