import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BitacoraPageRoutingModule } from './bitacora-routing.module';

import { BitacoraPage } from './bitacora.page';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  resourceTimelinePlugin
]);


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BitacoraPageRoutingModule,
    FullCalendarModule,
  ],
  declarations: [BitacoraPage]
})
export class BitacoraPageModule {}
