import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CertificacionesLsPage } from './certificaciones.page';

const routes: Routes = [
  {
    path: '',
    component: CertificacionesLsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CertificacionesPageRoutingModule {}
