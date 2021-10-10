import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviosDeCorreosPage } from './envios-de-correos.page';

const routes: Routes = [
  {
    path: '',
    component: EnviosDeCorreosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviosDeCorreosPageRoutingModule {}
