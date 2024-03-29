import { MaterialModule } from './../../../shared/material-angular/material-angular.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePickerComponent } from './date-picker.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DatePickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MaterialModule
  ],
  exports: [
    DatePickerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DatePickerModule { }
