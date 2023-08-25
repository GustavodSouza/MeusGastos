import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/paginas/login/services/login.service';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.scss']
})
export class MenuMobileComponent implements OnInit {

  @Input() public menu;
  @Input() public toolbar;

  constructor(
    private router: Router,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  redirecionar(rota: string): void {
    this.router.navigateByUrl(rota);
  }

  logout(): void {
    this.loginService.logout();
  }
}
