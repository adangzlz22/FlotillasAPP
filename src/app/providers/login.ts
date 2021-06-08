import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigProvider } from './config';
import { TipoPeticionControllerProvider } from './TipoPeticion';


@Injectable()
export class  UsuarioProvider {
    url_principal: string;
  

    PKMenuBandera:number;
    PKUsuario:number;
    PKNivel:number;

    keyUser='smbtrack';
    userSmbTrack:string;
    passSmbTrack:string;
    accessToken:string;
    idUser:string;
    datos:any;

    constructor(
      public http: HttpClient,
      private config: ConfigProvider,
      private _TipoPeticion: TipoPeticionControllerProvider,
      ) {
       console.log('Hello Usuario Provider');
      this.url_principal = this.config.APIURL + "Usuarios/";
    }
  
    Login(users:string,pass:string) {
      let usuario = new Promise((resolve,reject) => {
  
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-type": "application/json"
        })
      };
  
      let url = this.url_principal + "Login";
   
      let Model = {
        users: users,
        pass: pass,
      };
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
  
  

}