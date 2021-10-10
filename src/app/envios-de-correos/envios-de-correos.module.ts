import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviosDeCorreosPageRoutingModule } from './envios-de-correos-routing.module';

import { EnviosDeCorreosPage } from './envios-de-correos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviosDeCorreosPageRoutingModule
  ],
  declarations: [EnviosDeCorreosPage]
})
export class EnviosDeCorreosPageModule {}
