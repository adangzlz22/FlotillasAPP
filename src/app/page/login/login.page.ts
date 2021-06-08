import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UsuarioProvider } from 'src/app/providers/login';
import {PeticionProvider} from '../../providers/peticiones'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  users:any;
  pass:any;
  DatosUsuarios:any;
  endpoint ='https://ci8dp85wa4.execute-api.us-east-1.amazonaws.com/imovit/access/login';
  datos:any;
  constructor( private peticion:PeticionProvider,
                private userProviders:UsuarioProvider,
                private navCtrl:NavController) { }

  ngOnInit() {
  }

  Logearme() {
    let objModel = {
      users:this.users,
      pass:this.pass
    }
      this.peticion.Post('Login/LogearseChoferes',objModel).then(result=>{
      this.DatosUsuarios=JSON.parse(result['Model']);
      this.peticion.users = this.DatosUsuarios.users;         
      this.peticion.pass = this.DatosUsuarios.pass;
      this.peticion.idEmpresa = this.DatosUsuarios.idEmpresa;
      this.peticion.idChofer = this.DatosUsuarios.id;
      this.userProviders.userSmbTrack = this.DatosUsuarios.userSmbTrack;
      this.userProviders.passSmbTrack = this.DatosUsuarios.passSmbTrack;
        
      let model ={
          user:this.userProviders.userSmbTrack ,
          pass:this.userProviders.passSmbTrack,
          keyUser:this.userProviders.keyUser,
          idEmpresa: this.peticion.idEmpresa,
        }

      this.peticion.Post('choferes/LogearseEnSmbTrack',model).then(result=>{
        this.datos=JSON.parse(result['Model']);
        this.userProviders.datos = this.datos.data;
        console.log(this.datos)
        let modeloSession={
          accessToken:this.userProviders.datos.token,
          idUser:this.userProviders.datos.idUser,
          user: this.userProviders.userSmbTrack ,
          idEmpresa:this.peticion.idEmpresa,
        }
        this.peticion.Post('choferes/CrearInicioDeSession',modeloSession).then(result=>{
          let fecha = new Date();
          let GuardarSessionAppActiva ={
            idChofer:this.peticion.idChofer,
            fechaInicio:fecha,
            inicioSession:true,
          }
          this.peticion.Post('choferes/GuardarSessionAppActiva',GuardarSessionAppActiva).then(result2=>{
                let datos2 = JSON.parse(result2['Model']);
                this.peticion.idSessionActiva = datos2.id;
                console.log('-------------->',this.peticion.idSessionActiva );
                this.navCtrl.navigateRoot('obtener-vehiculos');
          }).catch(errr=>{
            console.log(errr)
            });
      }).catch(errr=>{
        console.log(errr)
        });
    }).catch(errr=>{
      console.log(errr)
      });
    }).catch(errr=>{
      console.log(errr)
    });    
  } 


}
