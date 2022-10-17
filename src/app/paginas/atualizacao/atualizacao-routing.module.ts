import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtualizacaoComponent } from './atualizacao.component';

const routes: Routes = [{
  path: '',
  component: AtualizacaoComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtualizacaoRoutingModule { }
