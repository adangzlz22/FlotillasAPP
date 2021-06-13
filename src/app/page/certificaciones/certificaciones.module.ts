import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CertificacionesPageRoutingModule } from './certificaciones-routing.module';

import { CertificacionesLsPage } from './certificaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CertificacionesPageRoutingModule
  ],
  declarations: [CertificacionesLsPage]
})
export class CertificacionesLstPageModule {}
