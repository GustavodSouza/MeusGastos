import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastoEstatisticaPorcentagemComponent } from './gasto-estatistica-porcentagem.component';


@NgModule({
  declarations: [
    GastoEstatisticaPorcentagemComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [GastoEstatisticaPorcentagemComponent]
})
export class GastoEstatisticaPorcentagemModule { }
