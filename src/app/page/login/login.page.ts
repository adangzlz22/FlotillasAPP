import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ChoferesService } from 'src/app/providers/choferes.service';
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
                private navCtrl:NavController, private router: Router,
                 public chofPR: ChoferesService) { }

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
                this.guardarStorage(objModel, model, modeloSession, GuardarSessionAppActiva);
                let datos2 = JSON.parse(result2['Model']);
                this.peticion.idSessionActiva = datos2.id;
                console.log('-------------->',this.peticion.idSessionActiva );
                this.ValidarReedireccionamiento();
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

  guardarStorage(userlogin: any,model: any, modeloSession: any, GuardarSessionAppActiva: any ){
    const user = {
      users:this.users,
      user:this.userProviders.userSmbTrack ,
      keyUser:this.userProviders.keyUser,
      idEmpresa: this.peticion.idEmpresa,
      ...modeloSession,
      ...GuardarSessionAppActiva   
    }    
    this.userProviders.setSesion(JSON.stringify(user));
  }

  ValidarReedireccionamiento(){
    this.chofPR.tieneCarroSesion().then(res=>{
      let datos2 = JSON.parse(res['Model']);
      if (datos2 && datos2.inicioSession) {
        this.router.navigateByUrl('/dashboard');
      }else{
        this.router.navigateByUrl('/obtener-vehiculos');
      }
    },err=>{
      console.log("TipoSesion Error",err);
      this.router.navigateByUrl('/obtener-vehiculos');
    });
  }
}
