import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material-angular/material-angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDropDownComponent } from './input-dropdown.component';

@NgModule({
  declarations: [InputDropDownComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [InputDropDownComponent]
})
export class InputDropDownModule { }
