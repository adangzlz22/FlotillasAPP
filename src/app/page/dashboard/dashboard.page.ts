import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { $ } from 'protractor';
import { UsuarioProvider } from 'src/app/providers/login';
import { PeticionProvider } from 'src/app/providers/peticiones';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  coloranteDrive = 'primary';
  coloranteOn = 'primary';
  coloranteSB = 'primary';
  coloranteOff = 'primary';
  tiempo ='10:00:00'
  idEstatusr:any;
  constructor(private menu:MenuController,
              private userProv:UsuarioProvider,
              private peticion:PeticionProvider,
              private navCtrl:NavController) {
    
   }

  ngOnInit() {
    // this.usuario();
    this.ObtenerEstatus();
    console.log(this.peticion.objVehiculo);
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }


  EntrarABitacora(){
    this.navCtrl.navigateRoot('bitacora');
  }

  EnviarInspeccion(){
    this.navCtrl.navigateRoot('certificar-inspeccion');
  }
  ObtenerEstatus(){
    let objModel = {
      idChofer:this.peticion.idChofer
    }
      this.peticion.Post('Bitacora/ObtenerEstatusActivo',objModel).then(result=>{
     let re = JSON.parse(result['Model']);
     console.log(re)
     this.idEstatusr = re.idEstatus;
        if(this.idEstatusr!=undefined){
          this.obtenerColo(this.idEstatusr)
        }
      }).catch(errr=>{
        console.log(errr)
    });
  }
  obtenerColo(idEs){
    console.log(idEs)
    if(idEs == 1)
    {
      this.coloranteDrive = 'primary';
      this.coloranteOn = 'success';
      this.coloranteSB = 'primary';
      this.coloranteOff = 'primary';
      return;
    }
    if(idEs == 2)
    {
      this.coloranteDrive = 'success';
      this.coloranteOn = 'primary';
      this.coloranteSB = 'primary';
      this.coloranteOff = 'primary';
      return;
    }
    if(idEs == 3)
    {
      this.coloranteDrive = 'primary';
      this.coloranteOn = 'primary';
      this.coloranteSB = 'primary';
      this.coloranteOff = 'success';
      return;
    }
    if(idEs == 4)
    return;
    {
      this.coloranteDrive = 'primary';
      this.coloranteOn = 'primary';
      this.coloranteSB = 'success';
      this.coloranteOff = 'primary';
    }
  }
  OFF() {
    console.log('OFF');
    this.coloranteDrive = 'primary';
    this.coloranteOn = 'primary';
    this.coloranteSB = 'primary';
    this.coloranteOff = 'success';
  this.CrearEditarStatus(3);
  }
  SB(){
    console.log('SB');
    this.coloranteDrive = 'primary';
    this.coloranteOn = 'primary';
    this.coloranteSB = 'success';
  this.CrearEditarStatus(4);
    this.coloranteOff = 'primary';
  }
  ON(){
    console.log('ON');
    this.coloranteDrive = 'primary';
    this.coloranteOn = 'success';
  this.CrearEditarStatus(1);
    this.coloranteSB = 'primary';
    this.coloranteOff = 'primary';
  }
  BotonesStatus
  DRIVE(){
    console.log('DRIVE')
    this.coloranteDrive = 'success';
  this.CrearEditarStatus(2);
    this.coloranteOn = 'primary';
    this.coloranteSB = 'primary';
    this.coloranteOff = 'primary';
  }

  CrearEditarStatus(idEstatus){
    let objModel = {
      idEstatus:idEstatus,
      idChofer:this.peticion.idChofer
    }
      this.peticion.Post('Bitacora/BotonesStatus',objModel).then(result=>{
    }).catch(errr=>{
        console.log(errr)
    });
  }
}
