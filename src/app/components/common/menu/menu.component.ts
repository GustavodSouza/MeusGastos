import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/paginas/login/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  
  @Input() public menu;
  @Input() public toolbar;

  public nomeResumido: string;

  constructor(
    private loginService: LoginService,
    public router: Router
  ) {
    this.loginService.primeiraLetraNome.subscribe((nomeResumido: string) => {
      this.nomeResumido = nomeResumido;
    });
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.loginService.logout();
  }
}
