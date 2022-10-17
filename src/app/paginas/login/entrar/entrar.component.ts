import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.scss']
})
export class EntrarComponent {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBarService: SnackbarService,
  ) {}

  logarComContaGoogle(): void {
    this.loginService.logarContaGoogle().then((resp) => {
      if (resp) {
        this.router.navigateByUrl('pagamento');
      }
    });
  }
}
