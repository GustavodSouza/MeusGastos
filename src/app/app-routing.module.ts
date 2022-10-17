import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from './guard/route-guard.service';
import { PaginaInicialComponent } from './paginas/pagina-inicial/pagina-inicial.component';
import { PaginaNaoEncontradaComponent } from './paginas/pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PaginaInicialComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'pagina-inicial',
    loadChildren: () => import('./paginas/pagina-inicial/pagina-inicial.module').then((m) => m.PaginaInicialModule),
    canActivate: [RouteGuardService]
  },
  {
    path: 'pagamento',
    loadChildren: () => import('./paginas/pagamento/pagamento.module').then((m) => m.PagamentoModule),
    canActivate: [RouteGuardService]
  },
  {
    path: 'entrar',
    loadChildren: () => import('./paginas/login/entrar/entrar.module').then((m) => m.EntrarModule),
    canActivate: [RouteGuardService]
  },
  {
    path: 'atualizacao',
    loadChildren: () => import('./paginas/atualizacao/atualizacao.module').then((m) => m.AtualizacaoModule),
    canActivate: [RouteGuardService]
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
})
export class AppRoutingModule { }
