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
  ) {}

  logarComContaGoogle(): void {
    this.loginService.logarContaGoogle().then((reponse) => {
      if (reponse) {
        this.router.navigateByUrl('pagamento');
      }
    });
  }
}
