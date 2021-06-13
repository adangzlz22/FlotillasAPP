import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from './config';
import { UsuarioProvider } from './login';
import { PeticionProvider } from './peticiones';
import { TipoPeticionControllerProvider } from './TipoPeticion';

@Injectable({
  providedIn: 'root',
})
export class ChoferesService {
  url_principal: string;

  constructor(
    public http: HttpClient,
    private config: ConfigProvider,
    private _TipoPeticion: PeticionProvider,
    public auth: UsuarioProvider
  ) {
    this.url_principal = this.config.APIURL + 'Choferes';
  }

  tieneCarroSesion() {
    const user = this.auth.getSesion();
    return this._TipoPeticion.get(
      `${this.url_principal}/choferTieneSesionByIdChofer?idChofer=${user.idChofer}`
    );
  }

  saveCertificado(objModelDatos) {
    const user = this.auth.getSesion();
    return this._TipoPeticion.Post(
      `choferes/CrearCertificacion`,objModelDatos
    );
  }

  obtenerCertificado() {
    const user = this.auth.getSesion();
    return this._TipoPeticion.get(
      `${this.url_principal}/obtenerCertificadosInspeccion?idChofer=${user.idChofer}`
    );
  }
  generarTablas() {
    let OBJ = [];
    let TR = '';
    OBJ.push({
      table: {
        headerRows: 1,
        // widths: [150, 171, 171],
        body: [[...this.headerTitulos()]],
      },
      layout: {
        hLineWidth: function (i, node) {
          return i === 0 || i === node.table.body.length ? 0.1 : 0.1;
        },
        vLineWidth: function (i, node) {
          return i === 0 || i === node.table.widths.length ? 0.1 : 0.1;
        },
      },
    });
    return OBJ;
  }
  headerTitulos() {
    let HeaderTitles = [];
    HeaderTitles.push({
      text: 'Estados',
      style: 'tableTitlesWhite',
      border: [1, 1, 1, 1],
      borderColor: ['#5a184f', '#5a184f', '#5a184f', '#5a184f'],
    });
    HeaderTitles.push({
      text: '12am',
      style: 'tableTitlesWhite',
      border: [1, 1, 1, 1],
      borderColor: ['#5a184f', '#5a184f', '#5a184f', '#5a184f'],
    });
    for (let index = 0; index < 11; index++) {
      HeaderTitles.push({
        text: index + 1 + 'am',
        style: 'tableTitlesWhite',
        border: [1, 1, 1, 1],
        borderColor: ['#5a184f', '#5a184f', '#5a184f', '#5a184f'],
      });
    }
    HeaderTitles.push({
      text: '12pm',
      style: 'tableTitlesWhite',
      border: [1, 1, 1, 1],
      borderColor: ['#5a184f', '#5a184f', '#5a184f', '#5a184f'],
    });
    for (let index = 0; index < 11; index++) {
      HeaderTitles.push({
        text: index + 1 + 'pm',
        style: 'tableTitlesWhite',
        border: [1, 1, 1, 1],
        borderColor: ['#5a184f', '#5a184f', '#5a184f', '#5a184f'],
      });
    }
    return HeaderTitles;
  }

  generarTablasDrives(estats: any) {
    let OBJ = [];
    let TR = '';
    OBJ.push({
      table: {
        headerRows: 1,
        // widths: [150, 171, 171],
        body: [[...this.headerDrives(estats)]],
      },
      layout: {
        hLineWidth: function (i, node) {
          return i === 0 || i === node.table.body.length ? 0.1 : 0.1;
        },
        vLineWidth: function (i, node) {
          return i === 0 || i === node.table.widths.length ? 0.1 : 0.1;
        },
      },
    });
    return OBJ;
  }

  headerDrives(estats: any, bitacora?: any[]) {
    let HeaderTitles = [];
    HeaderTitles.push({
      text: estats.title,
      style: 'tableTitlesWhite',
      border: [1, 1, 1, 1],
      borderColor: ['#5a184f', '#5a184f', '#5a184f', '#5a184f'],
    });
    for (let index = 0; index < 24; index++) {
      HeaderTitles.push({
        text: '',
        style: this.validateColor(bitacora, estats, index + 1),
        border: [1, 1, 1, 1],
        borderColor: ['#5a184f', '#5a184f', '#5a184f', '#5a184f'],
      });
    }
    return HeaderTitles;
  }

  validateColor(bitacora: any[], estats: any, index: any){
    if (bitacora.length) {
      return bitacora.filter(res => res.idEstado == estats.id && res.horaInicia == this.swichTime(index)).length ?
       'tableTitlesBacground' : 'tableTitlesWhite';
    }else{
      return 'tableTitlesWhite'
    }
  }

  swichTime(time) {
    switch (time) {
      case 1:
        return '12am';
      case 2:
        return '1am';
      case 3:
        return '2am';
      case 4:
        return '3am';
      case 5:
        return '4am';
      case 6:
        return '5am';
      case 7:
        return '6am';
      case 8:
        return '7am';
      case 9:
        return '8am';
      case 10:
        return '9am';
      case 11:
        return '10am';
      case 12:
        return '11am';
      case 13:
        return '12pm';
      case 14:
        return '1pm';
      case 15:
        return '2pm';
      case 16:
        return '3pm';
      case 17:
        return '4pm';
      case 18:
        return '5pm';
      case 19:
        return '6pm';
      case 20:
        return '7pm';
      case 21:
        return '8pm';
      case 22:
        return '9pm';
      case 23:
        return '10pm';
      case 24:
        return '11pm';
      default:
        return '';
    }
  }
}
