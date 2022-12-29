import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFiltroComponent } from './input-filtro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material-angular/material-angular.module';

@NgModule({
  declarations: [InputFiltroComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [InputFiltroComponent]
})
export class InputFiltroModule { }
