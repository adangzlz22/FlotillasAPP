import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UsuarioProvider } from 'src/app/providers/login';
import { PeticionProvider } from 'src/app/providers/peticiones';

@Component({
  selector: 'app-obtener-vehiculos',
  templateUrl: './obtener-vehiculos.page.html',
  styleUrls: ['./obtener-vehiculos.page.scss'],
})
export class ObtenerVehiculosPage implements OnInit {

  datos:any;
  DatosVehiculos:any;

  SeleccionarVehiculo:any;
  SeleccionarRemolques1:any;
  SeleccionarRemolques2:any;
  SeleccionarEnvios:any;

  constructor(private userProv:UsuarioProvider,
              private peticion:PeticionProvider,
              public modalController: ModalController,
              private navCtrl:NavController) { }

  ngOnInit() {
    this.obtenerVehiculos();
  }

  obtenerVehiculos(){
    let objModel = {
       user:this.userProv.userSmbTrack ,
       Content: "application/json",
       accessToken: this.userProv.datos.token,
       keyUser: this.userProv.keyUser,
       idUser: this.userProv.datos.idUser,
     }
     this.peticion.Post('Choferes/ObtenerVehiculos',objModel).then(result=>{ 
       this.datos = JSON.parse(result['Model']);
       this.DatosVehiculos = this.datos.data;
       console.log(this.DatosVehiculos)
    }).catch(errr=>{
    console.log(errr)
    });
  }

  fncSeleccionar(){
    console.log(this.SeleccionarVehiculo);

    this.peticion.objVehiculo.vehiculo = this.SeleccionarVehiculo;
    this.peticion.objVehiculo.remolque1 = this.SeleccionarRemolques1;
    this.peticion.objVehiculo.remolque2 = this.SeleccionarRemolques2;
    this.peticion.objVehiculo.envios = this.SeleccionarEnvios;

    let SessionApp={
      placa:this.SeleccionarVehiculo,
      idChofer:this.peticion.idChofer
    }

    this.peticion.Post('choferes/GuardarSessionAppActiva',SessionApp).then(result2=>{

          this.navCtrl.navigateRoot('dashboard');
      }).catch(errr=>{
        console.log(errr)
    });
  }

  crazyEvent(event){
    console.log(event)
  }
 



}
