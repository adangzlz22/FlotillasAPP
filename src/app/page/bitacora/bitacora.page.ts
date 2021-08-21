import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { PeticionProvider } from 'src/app/providers/peticiones';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ChoferesService } from 'src/app/providers/choferes.service';
import { UsuarioProvider } from 'src/app/providers/login';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.page.html',
  styleUrls: ['./bitacora.page.scss'],
})
export class BitacoraPage implements OnInit {
  fechaActual = new Date();
  calendarOptions: CalendarOptions = {
    plugins: [resourceTimelinePlugin],
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    now: this.fechaActual,
    editable: true, // enable draggable events
    aspectRatio: 1.8,
    scrollTime: '00:00', // undo default 6am scrollTime
    height: '320px',
    headerToolbar: {},
    initialView: 'resourceTimelineDay',
    views: {},
    resourceAreaWidth: '25%',
    resourceAreaHeaderContent: 'ESTADOS',
  };
  eventos: any;
  bitacora: any;
  etatus = [ { id: '1', title: 'ON DUTY', eventColor: 'yellow' },
  { id: '2', title: 'DRIVE', eventColor: 'green' },
  { id: '3', title: 'OFF', eventColor: 'black' },
  { id: '4', title: 'SB', eventColor: 'orange' }]
  pdfObj = null
  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private peticion: PeticionProvider,
    public chofer: ChoferesService,
    public userProv: UsuarioProvider,
    private plt: Platform,
     public file: File, 
    public fileOpener: FileOpener,
  ) {}

  ngOnInit() {
    this.ExtraerEventos();
    this.ObtenerBitacoraInformacion();
    setTimeout(() => {
      console.log(this.eventos);
      this.CargarFullcallendar(this.eventos);
    }, 1000);
  }

  ExtraerEventos() {
    function zero(n) {
      return (n > 9 ? '' : '0') + n;
    }
    var date = new Date();
    let fechaActua =
      date.getFullYear() +
      '-' +
      zero(date.getMonth() + 1) +
      '-' +
      zero(date.getDate());
   const user = this.userProv.getSesion();
    let objModel = {
      fechaActual: fechaActua,
      idChofer: user.idChofer,
    };
    this.peticion
      .Post('Bitacora/ObtenerBitacoraEventos', objModel)
      .then((result) => {
        this.eventos = JSON.parse(result['Model']);
        console.log(this.eventos);
      })
      .catch((errr) => {
        console.log(errr);
      });
  }
  ObtenerBitacoraInformacion() {
    function zero(n) {
      return (n > 9 ? '' : '0') + n;
    }
    var date = new Date();
    let fechaActua =
      date.getFullYear() +
      '-' +
      zero(date.getMonth() + 1) +
      '-' +
      zero(date.getDate());
   const user = this.userProv.getSesion();
    let objModel = {
      fechaActual: fechaActua,
      idChofer: user.idChofer,
    };
    this.peticion
      .Post('Bitacora/ObtenerBitacoraInformacion', objModel)
      .then((result) => {
        this.bitacora = JSON.parse(result['Model']);
        if (this.bitacora.length) {
          this.bitacora = this.bitacora.map((res: any) => ({...res, horaInicia: (new Date(res.fechaInicio).getHours() % 12 || 12) + this.validarHora(res.fechaInicio) , 
          horaTermina: (new Date(res.fechaFin).getHours() % 12 || 12) + this.validarHora(res.fechaInicio) }));
        }
        console.log(this.bitacora);
      })
      .catch((errr) => {
        console.log(errr);
      });
  }
  validarHora(fechaInicio){
    return new Date(fechaInicio).getHours() >= 12 ? 'pm' : 'am'
  }
  CargarFullcallendar(events) {
    this.calendarOptions = {
      plugins: [resourceTimelinePlugin],
      schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      now: this.fechaActual,
      editable: true, // enable draggable events
      aspectRatio: 1.8,
      scrollTime: '00:00', // undo default 6am scrollTime
      height: '320px',
      headerToolbar: {
        left: 'today prev', //,next',
        center: 'title',
        // right: 'resourceTimelineDay'
      },
      initialView: 'resourceTimelineDay',
      views: {
        resourceTimelineThreeDays: {
          type: 'resourceTimeline',
          // duration: { days: 3 },
          // buttonText: '3 day'
        },
      },
      resourceAreaWidth: '25%',
      resourceAreaHeaderContent: 'ESTADOS',
      resources: [
        { id: '2', title: 'DRIVE', eventColor: 'green' },
        { id: '3', title: 'OFF', eventColor: 'black' },
        { id: '4', title: 'SB', eventColor: 'orange' },
        { id: '1', title: 'ON DUTY', eventColor: 'yellow' },
      ],
      events: events,
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

  EntrarABitacora() {
    this.navCtrl.navigateRoot('dashboard');
  }
  EnviarInspeccion() {
    this.navCtrl.navigateRoot('certificar-inspeccion');
  }

  imprimirBitacore() {
    var docDefinition = {
      content: [
        {
          columns: [
            [
              { text: 'BITACORA', style: 'header' },
            ],
          ],
        },
        {
          table: {
            headerRows: 1,
             widths: [...this.whitHeader()],
            body: [
             [...this.chofer.headerTitulos()],
            ]
          }
        },
        {
          table: {
            headerRows: 1,
            widths: [...this.whitHeader()],
            body: [
             [...this.validateOnDrives()],
            ]
          }
        },
        {
          table: {
            headerRows: 1,
            widths: [...this.whitHeader()],
            body: [
             [...this.validateDrives()],
            ]
          }
        },
        {
          table: {
            headerRows: 1,
            widths: [...this.whitHeader()],
            body: [
             [...this.validateOFF()],
            ]
          }
        },
        {
          table: {
            headerRows: 1,
            widths: [...this.whitHeader()],
            body: [
             [...this.validateSB()],
            ]
          }
        },
        {
          columns: [
            { width: 1, heigth: 1, text: '', margin: [5, 5, 5, 5] },
            { width: 1, heigth: 1, text: '', margin: [5, 5, 5, 5] },
            { width: 1, heigth: 1, text: '', margin: [5, 5, 5, 5] },
            { width: 1, heigth: 1, text: '', margin: [5, 5, 5, 5] }
          ]
        },
        ...this.bitacoraList()
      ],
      styles: {
        header: {
          bold: true,
          fontSize: 20,
          alignment: 'left',
        },
        tableTitlesWhite:
        {
          fillColor: '#ffffff',
          color: 'black',
          alignment: 'center',
          bold: true,
          fontSize: 10,
          width: 8 
        },
        tableTitlesBacground:
        {
          fillColor: 'green',
          color: 'black',
          alignment: 'center',
          bold: true,
          fontSize: 10,
          width: 8,
          background: '#000000'
        },
      },
      pageSize: 'A4',
      pageMargins: [ 10, 60, 0, 60 ],
      pageOrientation: 'landscape',
    };
    this.pdfObj = pdfMake.createPdf(docDefinition);
    setTimeout(() => {
      this.downloadPdf();
      }, 2000);
   }

  whitHeader(){
    let HeaderWhidt = [];
    HeaderWhidt.push(50)
    for (let index = 0; index < 24; index++) {
      HeaderWhidt.push(22)
    }
    return HeaderWhidt;
  }
  validateOnDrives(){
   return this.chofer.headerDrives({ id: 1, title: 'ON DUTY', eventColor: 'yellow' }, this.bitacora);
  }
  validateDrives(){
    return this.chofer.headerDrives({ id: 2, title: 'DRIVE', eventColor: 'green' }, this.bitacora);
   }
   validateOFF(){
    return this.chofer.headerDrives({ id: 3, title: 'OFF', eventColor: 'black' }, this.bitacora);
   }
   validateSB(){
    return this.chofer.headerDrives({ id: 4, title: 'SB', eventColor: 'orange' }, this.bitacora);
   }

   bitacoraList(){
     let ObjLst = [];
     this.bitacora.forEach(bitacora => {
       ObjLst.push(
          {
            columns: [
              [
                { text: 'Ubicación:' + bitacora.nombreUbicacion },
                { text: 'Status:' + bitacora.EstadoAccion},
                { text: 'Tiempo Inicial:' + this.fechaFormat(bitacora.fechaInicio)},
                { text: 'Tiempo Final:' + this.fechaFormat(bitacora.fechaFin)},
              ],
            ],
          },
          {
            columns: [
              { width: 1, heigth: 1, text: '', margin: [5, 5, 5, 5] },
              { width: 1, heigth: 1, text: '', margin: [5, 5, 5, 5] }],
          }
        )
     });
     return ObjLst;
   }

   fechaFormat(Fecha){
     const fechaDate = new Date(Fecha);
     return fechaDate.toLocaleString();
   }

   downloadPdf() {
   
    const title = `${'Bitacora'}.pdf`;
    
    if (this.plt.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });
        this.file.writeFile(this.file.dataDirectory, title, blob, {replace: true }).then(fileEntry => {          
          this.fileOpener.open(this.file.dataDirectory + title, 'application/pdf');
        },err=>{
          console.log(err);
        })
      },err=>{
        console.log(err);
        
      });
    } else {
      this.pdfObj.download(title);
    }
  }
}
