import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalRemolquePageRoutingModule } from './modal-remolque-routing.module';

import { ModalRemolquePage } from './modal-remolque.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalRemolquePageRoutingModule
  ],
  declarations: [ModalRemolquePage]
})
export class ModalRemolquePageModule {}
