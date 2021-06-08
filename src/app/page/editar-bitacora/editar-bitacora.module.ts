import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarBitacoraPageRoutingModule } from './editar-bitacora-routing.module';

import { EditarBitacoraPage } from './editar-bitacora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarBitacoraPageRoutingModule
  ],
  declarations: [EditarBitacoraPage]
})
export class EditarBitacoraPageModule {}
