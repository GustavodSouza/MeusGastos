import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntlCro } from '../../../shared/config/table-config';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabelaComponent } from './tabela.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TabelaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    FontAwesomeModule,
    MatButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [TabelaComponent],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlCro,
    },
  ]
})
export class TabelaModule { }
