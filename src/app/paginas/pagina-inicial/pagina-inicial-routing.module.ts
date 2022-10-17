import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagamentoComponent } from '../pagamento/pagamento.component';
import { PaginaInicialComponent } from './pagina-inicial.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaInicialComponent,
    children: [
      {
        path: 'pagamento',
        component: PagamentoComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaInicialRoutingModule { }
