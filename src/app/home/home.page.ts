import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { UsuarioProvider } from '../providers/login';
import { PeticionProvider } from '../providers/peticiones';
export interface MenuElementsInterface {
  nombre: string;
  enlace: string;
  Icon:string;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  datosMenu: MenuElementsInterface[] = [

    {
      nombre: 'Dashboard',
      enlace: '/dashboard',
      Icon: 'briefcase'
    },
    {
      nombre: 'Bitacora',
      enlace: '/bitacora',
      Icon: 'briefcase'
    },
    {
      nombre: 'Vehiculo',
      enlace: '/obtener-vehiculos',
      Icon: 'briefcase'
    },
    {
      nombre: 'Inspecciones tracto/caja',
      enlace: '/certificacionesLst',
      Icon: 'briefcase'
    },
    // {
    //   nombre: 'Acerca de',
    //   enlace: '',
    //   Icon: 'information-circle-outline'
    // }
  ];
  constructor(private navCtrl:NavController,
    private menu:MenuController,
    private peticion:PeticionProvider,
    private userProv:UsuarioProvider,
    public _router: Router) {}

    EnviarInspeccion(url){
      console.log(url);
      
      this.navCtrl.navigateRoot(url);
    }

    logouth(){
      const user = this.userProv.getSesion()
      let SessionApp={
        idChofer:user.idChofer
      }
  
      this.peticion.Post('choferes/CerrarSession',SessionApp).then(result2=>{
      localStorage.clear();
      this.menu.close().then(()=>{
          this._router.navigateByUrl('/', { replaceUrl:true });
        })
        }).catch(errr=>{
          console.log(errr)
          localStorage.clear();
        });
  
    }
}
