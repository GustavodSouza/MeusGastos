import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputFiltroComponent } from './input-filtro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [InputFiltroComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [InputFiltroComponent]
})
export class InputFiltroModule { }
