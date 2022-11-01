import { AccordionComponent } from './accordion.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material-angular/material-angular.module';

@NgModule({
  declarations: [AccordionComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [AccordionComponent]
})
export class AccordionModule { }
