import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarPerfilComponent } from './editar-perfil.component';
import { EditarPerfilRoutingModule } from './editar-perfil-routing.module';
import { CardModule } from 'src/app/components/common/card/card.module';



@NgModule({
  declarations: [EditarPerfilComponent],
  imports: [
    CommonModule,
    EditarPerfilRoutingModule,
    CardModule
  ],
  exports: [EditarPerfilComponent]
})
export class EditarPerfilModule { }
