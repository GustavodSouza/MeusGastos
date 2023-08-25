import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntrarComponent } from './paginas/login/entrar/entrar.component';
import { PaginaNaoEncontradaComponent } from './paginas/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { GuardaRotaGuard } from './shared/guard/guarda-rota.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EntrarComponent,
    canActivate: [GuardaRotaGuard]
  },
  {
    path: 'pagamento',
    loadChildren: () => import('./paginas/pagamento/pagamento.module').then((m) => m.PagamentoModule),
    canActivate: [GuardaRotaGuard]
  },
  {
    path: 'entrar',
    loadChildren: () => import('./paginas/login/entrar/entrar.module').then((m) => m.EntrarModule),
    canActivate: [GuardaRotaGuard]
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./paginas/editar-perfil/editar-perfil.module').then((m) => m.EditarPerfilModule),
    canActivate: [GuardaRotaGuard]
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
    canActivate: [GuardaRotaGuard],
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
})
export class AppRoutingModule { }
