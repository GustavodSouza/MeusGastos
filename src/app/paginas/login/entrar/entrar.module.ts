import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrarRoutingModule } from './entrar-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EntrarRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EntrarModule { }
