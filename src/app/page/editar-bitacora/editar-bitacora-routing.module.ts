import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarBitacoraPage } from './editar-bitacora.page';

const routes: Routes = [
  {
    path: '',
    component: EditarBitacoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarBitacoraPageRoutingModule {}
