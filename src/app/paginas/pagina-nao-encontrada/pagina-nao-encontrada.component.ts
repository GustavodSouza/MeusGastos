import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrada',
  styleUrls: ['./pagina-nao-encontrada.component.scss'],
  templateUrl: './pagina-nao-encontrada.component.html',
})
export class PaginaNaoEncontradaComponent {

  constructor(private router: Router) {}

  redirecionar() {
    this.router.navigateByUrl('/pagamento');
  }
}
