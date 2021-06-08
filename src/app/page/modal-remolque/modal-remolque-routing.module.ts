import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalRemolquePage } from './modal-remolque.page';

const routes: Routes = [
  {
    path: '',
    component: ModalRemolquePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalRemolquePageRoutingModule {}
