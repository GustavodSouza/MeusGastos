import { SeletorDatasComponent } from './seletor-datas.component';
import { MatIconModule } from '@angular/material/icon';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [SeletorDatasComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FontAwesomeModule,
  ],
  exports: [SeletorDatasComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SeletorDatasModule { }
