import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObtenerVehiculosPage } from './obtener-vehiculos.page';

const routes: Routes = [
  {
    path: '',
    component: ObtenerVehiculosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObtenerVehiculosPageRoutingModule {}
