import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { ChoferesService } from './providers/choferes.service';
import { UsuarioProvider } from './providers/login';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private authProv: UsuarioProvider, private router: Router, public navCtrl: NavController
    , public chofPR: ChoferesService) {
    platform.ready().then(()=>{
      const user = this.authProv.getSesion();
      if (user && user.idUser != 0) {
        console.log("entre y tengo login");
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
      }else{
        this.router.navigateByUrl('/login');
      }
    })
  }
}
