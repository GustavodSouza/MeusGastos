import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagamentoRoutingModule } from './pagamento-routing.module';
import { TabelaComponent } from 'src/app/components/common/tabela/tabela.component';

@NgModule({
  declarations: [
  //  TabelaComponent,
  ],
  imports: [
    CommonModule,
    PagamentoRoutingModule
  ],
  exports: [
   // TabelaComponent
  ]
})
export class PagamentoModule { }
