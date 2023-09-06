import { EditarPagamentoComponent } from './editar-pagamento/editar-pagamento.component';
import { ConfirmarDialogModule } from './confirmar/confirmar.module';
import { CardModule } from './../../components/common/card/card.module';
import { MaterialModule } from './../../shared/material-angular/material-angular.module';
import { InputModule } from './../../components/common/input/input.module';
import { ButtonModule } from './../../components/common/button/button.module';
import { TabelaModule } from './../../components/common/tabela/tabela.module';
import { DatePickerModule } from './../../components/common/date-picker/date-picker.module';
import { LoaderComponent } from '../../components/common/loader/loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagamentoComponent } from './pagamento.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagamentoRoutingModule } from './pagamento-routing.module';
import { InputDropDownModule } from 'src/app/components/common/input-dropdown/input-dropdown.module';

@NgModule({
  declarations: [
    PagamentoComponent,
    LoaderComponent,
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
    CardModule,
    ConfirmarDialogModule,
    InputDropDownModule
  ],
  exports: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagamentoModule { }
