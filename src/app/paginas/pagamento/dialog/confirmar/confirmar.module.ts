import { MaterialModule } from './../../../../shared/material-angular/material-angular.module';
import { ConfirmarDialogComponent } from './confirmar.component';
import { ButtonModule } from './../../../../components/common/button/button.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ConfirmarDialogComponent],
  imports: [
    CommonModule,
    ButtonModule,
    MaterialModule
  ],
  exports: [ConfirmarDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfirmarModule { }
