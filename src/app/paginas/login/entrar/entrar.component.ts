import { LoaderPagamentosService } from 'src/app/components/common/loader-pagamentos/loader-pagamentos.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.scss']
})
export class EntrarComponent {
  
  constructor(
    private loginService: LoginService,
    private router: Router,
    private loader: LoaderPagamentosService
  ) {}

  logarComContaGoogle(): void {
    this.loader.loaderAtivo = true;
    this.loginService.logarContaGoogle().then((reponse) => {
      if (reponse) {
        this.router.navigateByUrl('pagamento');
      }
    });
  }
}
