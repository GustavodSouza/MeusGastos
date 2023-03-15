import { EditarPagamentoComponent } from './editar-pagamento/editar-pagamento.component';
import { ConfirmarDialogModule } from './confirmar/confirmar.module';
import { InformacaoModule } from './../../components/common/informacao/informacao.module';
import { CardModule } from './../../components/common/card/card.module';
import { AccordionModule } from './../../components/common/accordion/accordion.module';
import { InputFiltroModule } from './../../components/common/input-filtro/input-filtro.module';
import { MaterialModule } from './../../shared/material-angular/material-angular.module';
import { InputModule } from './../../components/common/input/input.module';
import { ButtonModule } from './../../components/common/button/button.module';
import { TabelaModule } from './../../components/common/tabela/tabela.module';
import { DatePickerModule } from './../../components/common/date-picker/date-picker.module';
import { LoaderPagamentosComponent } from './../../components/common/loader-pagamentos/loader-pagamentos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagamentoComponent } from './pagamento.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagamentoRoutingModule } from './pagamento-routing.module';
import { DropdownModule } from 'src/app/components/common/dropdown/dropdown.module';
import { GastoEstatisticaPorcentagemModule } from 'src/app/components/common/gasto-estatistica-porcentagem/gasto-estatistica-porcentagem.module';

@NgModule({
  declarations: [
    PagamentoComponent,
    LoaderPagamentosComponent,
    EditarPagamentoComponent
  ],
  imports: [
    CommonModule,
    PagamentoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    TabelaModule,
    ButtonModule,
    InputModule,
    MaterialModule,
    InputFiltroModule,
    AccordionModule,
    CardModule,
    InformacaoModule,
    ConfirmarDialogModule,
    DropdownModule,
    GastoEstatisticaPorcentagemModule
  ],
  exports: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagamentoModule { }
