import { ButtonModule } from '../../../components/common/button/button.module';
import { MaterialModule } from '../../../shared/material-angular/material-angular.module';
import { ConfirmarDialogComponent } from './confirmar.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ConfirmarDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ConfirmarDialogComponent]
})
export class ConfirmarDialogModule { }
