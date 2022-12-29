import { MaterialModule } from 'src/app/shared/material-angular/material-angular.module';
import { CardComponent } from './card.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [CardComponent]
})
export class CardModule { }
