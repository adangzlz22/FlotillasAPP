import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { MenuController, NavController } from '@ionic/angular';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { PeticionProvider } from 'src/app/providers/peticiones';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.page.html',
  styleUrls: ['./bitacora.page.scss'],
})
export class BitacoraPage implements OnInit {
  fechaActual = new Date();
  calendarOptions: CalendarOptions = {
    plugins: [  resourceTimelinePlugin ],
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    now: this.fechaActual,
    editable: true, // enable draggable events
    aspectRatio: 1.8,
    scrollTime: '00:00', // undo default 6am scrollTime
    height: '320px',
    headerToolbar: {

    },
    initialView: 'resourceTimelineDay',
    views: {
    },
    resourceAreaWidth: '25%',
    resourceAreaHeaderContent: 'ESTADOS',

  };
   eventos:any;
   bitacora:any;


  constructor(private navCtrl:NavController,
              private menu:MenuController,
              private peticion:PeticionProvider) { }

  ngOnInit() {
    this.ExtraerEventos();
    this.ObtenerBitacoraInformacion();
      setTimeout(() => {
        console.log(this.eventos);
        this.CargarFullcallendar(this.eventos);
      }, 1000);
  }

  ExtraerEventos(){
    function zero(n) {
      return (n>9 ? '' : '0') + n;
     }
     var date = new Date();
  let fechaActua = date.getFullYear() +"-"+zero(date.getMonth()+1) +"-"+zero(date.getDate()) 
    let objModel = {
      fechaActual:fechaActua,
      idChofer:this.peticion.idChofer
    }
      this.peticion.Post('Bitacora/ObtenerBitacoraEventos',objModel).then(result=>{
     this.eventos  = JSON.parse(result['Model']);
     console.log(this.eventos)
    }).catch(errr=>{
        console.log(errr)
    });
  }
  ObtenerBitacoraInformacion(){
    function zero(n) {
      return (n>9 ? '' : '0') + n;
     }
     var date = new Date();
  let fechaActua = date.getFullYear() +"-"+zero(date.getMonth()+1) +"-"+zero(date.getDate()) 
    let objModel = {
      fechaActual:fechaActua,
      idChofer:this.peticion.idChofer
    }
      this.peticion.Post('Bitacora/ObtenerBitacoraInformacion',objModel).then(result=>{
     this.bitacora  = JSON.parse(result['Model']);
     console.log(this.bitacora);
    }).catch(errr=>{
        console.log(errr)
    });
  }
  CargarFullcallendar(events){
    this.calendarOptions= {
      plugins: [  resourceTimelinePlugin ],
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      now: this.fechaActual,
      editable: true, // enable draggable events
      aspectRatio: 1.8,
      scrollTime: '00:00', // undo default 6am scrollTime
      height: '320px',
      headerToolbar: {
        
        left: 'today prev',//,next',
        center: 'title',
        // right: 'resourceTimelineDay'
      },
      initialView: 'resourceTimelineDay',
      views: {
        resourceTimelineThreeDays: {
          type: 'resourceTimeline',
          // duration: { days: 3 },
          // buttonText: '3 day'
        }
      },
      resourceAreaWidth: '25%',
      resourceAreaHeaderContent: 'ESTADOS',
      resources: [
        { id: '2', title: 'DRIVE', eventColor: 'green' },
        { id: '3', title: 'OFF', eventColor: 'black' },
        { id: '4', title: 'SB', eventColor: 'orange' },
        { id: '1', title: 'ON DURY' , eventColor: 'yellow'},
      ],
      events: events
    };
  }
 
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

   
  EntrarABitacora(){
    this.navCtrl.navigateRoot('dashboard');

  }
  EnviarInspeccion(){
    this.navCtrl.navigateRoot('certificar-inspeccion');
  }
}
