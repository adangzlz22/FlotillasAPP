import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from './config';
import { TipoPeticionControllerProvider } from './TipoPeticion';


@Injectable()
export class  PeticionProvider {
    url_principal: string;
    users: string;
    pass: string;
    PKMenuBandera:number;
    PKUsuario:number;
    PKNivel:number;
    idEmpresa:number;
    idChofer:number;

    idSessionActiva:number;

    objVehiculo = {
      vehiculo:'',
      remolque1:'',
      remolque2:'',
      envios:'',
    };

    constructor(
      public http: HttpClient,
      private config: ConfigProvider,
      private _TipoPeticion: TipoPeticionControllerProvider,
      ) {}
  
    Post(endpoint,objModelDatos) {
      let usuario = new Promise((resolve,reject) => {
  
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-type": "application/json"
        })
      };
  
      let url = this.config.APIURL + endpoint 
   
      let Model = objModelDatos;
      let Peticion = {
        Model: JSON.stringify(Model),
        TipoPeticion: this._TipoPeticion.TipoPeticionController.choferes,
        Formato: 2
      };
      this.http.post(url, JSON.stringify(Peticion), httpOptions).subscribe(
        val => {
            resolve(val);
        },
        Error => {
          console.log("POST call in error", Error);
            reject(Error);
        }
      );
    });
    return usuario;
    }
  
    getHeader(endpoint,parametrosGet,accesToken,idUser,keyUser) {
      let usuario = new Promise((resolve,reject) => {
  
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-type": "application/json",
          "accessToken":accesToken,
          "keyUser":keyUser,
          "idUser":idUser,
        })
      };
  
      let url = endpoint + parametrosGet
   
      this.http.get(url, httpOptions).subscribe(
        val => {
            resolve(val);
        },
        Error => {
          console.log("POST call in error", Error);
            reject(Error);
        }
      );
    });
    return usuario;
    }

    postSmbTrack(endpoint,keyUser,user,pass) {
      let usuario = new Promise((resolve,reject) => {
        
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-type": "application/json",
          "Accept" : "application/json",
        })
      };
      let parametrosPost = '"{\"user\":\"sistemas@comestiblesmaldonado.com\",\"pass\":\"SMT30122020\",\"keyUser\":\"smbtrack\"}"';

      let url = endpoint ;
      console.log(url)
      console.log(parametrosPost)
      console.log(httpOptions)
      this.http.post(url, parametrosPost, httpOptions).subscribe(
        val => {
            resolve(val);
        },
        Error => {
          console.log("POST call in error", Error);
            reject(Error);
        }
      );
    });
    return usuario;
    }




}