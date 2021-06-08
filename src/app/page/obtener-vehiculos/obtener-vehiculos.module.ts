import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObtenerVehiculosPageRoutingModule } from './obtener-vehiculos-routing.module';

import { ObtenerVehiculosPage } from './obtener-vehiculos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObtenerVehiculosPageRoutingModule
  ],
  declarations: [ObtenerVehiculosPage]
})
export class ObtenerVehiculosPageModule {}
