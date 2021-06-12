import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, ModalController } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

//PROVIDERS
import { PeticionProvider } from './providers/peticiones';
import { ConfigProvider } from './providers/config';
import { TipoPeticionControllerProvider } from './providers/TipoPeticion';
import { UsuarioProvider } from './providers/login';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { ChoferesService } from './providers/choferes.service';
import { HomePageModule } from './home/home.module';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  resourceTimelinePlugin
]);

@NgModule({
  declarations: [AppComponent
  ],
  entryComponents: [
  ],
  imports: [BrowserModule,  
            IonicModule.forRoot(), 
            AppRoutingModule,
            HttpClientModule,
            FullCalendarModule,
            HomePageModule
          ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
               PeticionProvider,
               UsuarioProvider,
               ConfigProvider,
               TipoPeticionControllerProvider,
               ChoferesService,
               FileOpener,
               File
  ],
  bootstrap: [AppComponent,],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
