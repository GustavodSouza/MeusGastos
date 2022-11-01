import { MaterialModule } from './../../../shared/material-angular/material-angular.module';
import { ButtonComponent } from './button.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ButtonComponent]
})
export class ButtonModule { }
