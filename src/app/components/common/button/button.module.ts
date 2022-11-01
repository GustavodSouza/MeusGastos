import { MaterialModule } from './../../../shared/material-angular/material-angular.module';
import { ButtonComponent } from './button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ButtonComponent]
})
export class ButtonModule { }
