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


  datosVehiculosAsignados:any;

  constructor(private userProv:UsuarioProvider,
              private peticion:PeticionProvider,
              public modalController: ModalController,
              private navCtrl:NavController) { }

  ngOnInit() {
    this.obtenerVehiculos();
  }
  ionViewWillEnter() {
    this.obtenerVehiculosYaAsignados();
  }


  obtenerVehiculos(){
    const user = this.userProv.getSesion();
    let objModel = {
       user: user.user ,
       Content: "application/json",
       accessToken: user.accessToken,
       keyUser: user.keyUser,
       idUser: user.idUser,
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
    const user = this.userProv.getSesion();

    this.peticion.objVehiculo.vehiculo = this.SeleccionarVehiculo;
    this.peticion.objVehiculo.remolque1 = this.SeleccionarRemolques1;
    this.peticion.objVehiculo.remolque2 = this.SeleccionarRemolques2;
    this.peticion.objVehiculo.envios = this.SeleccionarEnvios;

    let SessionApp={
      placa:this.SeleccionarVehiculo,
      idChofer: user.idChofer,
      remolque1: this.SeleccionarRemolques1,
      remolque2: this.SeleccionarRemolques2,
      envios: this.SeleccionarEnvios,
    }

    this.peticion.Post('choferes/GuardarSessionAppActiva',SessionApp).then(result2=>{

          this.navCtrl.navigateRoot('dashboard');
      }).catch(errr=>{
        console.log(errr)
    });
  }

  obtenerVehiculosYaAsignados(){
      const user = this.userProv.getSesion();

      let SessionApp={
        idChofer: user.idChofer
      }
      this.peticion.Post('choferes/obtenerVehiculosYaAsignados',SessionApp).then(result2=>{
       this.datosVehiculosAsignados = JSON.parse(result2['Model']);
       
       this.SeleccionarVehiculo = this.datosVehiculosAsignados.placa;
       this.SeleccionarRemolques1 = this.datosVehiculosAsignados.Remolque1;
       this.SeleccionarRemolques2 = this.datosVehiculosAsignados.Remolque2;
       this.SeleccionarEnvios = this.datosVehiculosAsignados.Envios;


       console.log(this.datosVehiculosAsignados);
        }).catch(errr=>{
          console.log(errr)
      });
  }


  crazyEvent(event){
    console.log(event)
  }
 



}
