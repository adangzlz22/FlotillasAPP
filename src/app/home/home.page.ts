import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
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
      nombre: 'Bitacora',
      enlace: '/bitacora',
      Icon: 'briefcase'
    },
    // {
    //   nombre: 'Inspeccion',
    //   enlace: '/certificar-inspeccion',
    //   Icon: 'briefcase'
    // },
    {
      nombre: 'Inspecciones List',
      enlace: '/certificacionesLst',
      Icon: 'briefcase'
    },
    {
      nombre: 'Acerca de',
      enlace: '',
      Icon: 'information-circle-outline'
    }
  ];
  constructor(private navCtrl:NavController,
    private menu:MenuController,
    private peticion:PeticionProvider,
    public _router: Router) {}

    EnviarInspeccion(url){
      console.log(url);
      
      this.navCtrl.navigateRoot(url);
    }

    logouth(){
      localStorage.clear();
      this.menu.close().then(()=>{
        this._router.navigateByUrl('/', { replaceUrl:true });
      })
    }
}
