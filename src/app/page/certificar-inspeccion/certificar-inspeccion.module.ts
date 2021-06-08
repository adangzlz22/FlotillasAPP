import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CertificarInspeccionPageRoutingModule } from './certificar-inspeccion-routing.module';

import { CertificarInspeccionPage } from './certificar-inspeccion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CertificarInspeccionPageRoutingModule
  ],
  declarations: [CertificarInspeccionPage]
})
export class CertificarInspeccionPageModule {}
