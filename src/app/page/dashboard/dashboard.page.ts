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
  tiempo:any;
  idEstatusr:any;
  nombreCompleto:any;
  constructor(private menu:MenuController,
              private userProv:UsuarioProvider,
              private peticion:PeticionProvider,
              private navCtrl:NavController) {
    
   }

  ngOnInit() {
    const user  = this.userProv.getSesion();
    
    let SessionApp={
      idChofer:user.idChofer
    }

    this.peticion.Post('choferes/ObtenerChoferNombre',SessionApp).then(result2=>{
      let m = JSON.parse(result2['Model']);
      this.nombreCompleto = m.nombre+' '+m.apeidoP+' '+m.apeidoM;
    }).catch(errr=>{
        console.log(errr)
    });
    // this.usuario();
   this.obtenerReloj();
    this.ObtenerEstatus();
  }
  temporizador(reloj){
    let nuevoReloj:any;
    let relojprueba='1:1:10';
    let relojito:any = reloj.split(':');
    let relojsetinterval = 1000;
    let segundos = relojito[2];
    let minutos = relojito[1];
    let horas = relojito[0];
    setInterval(() => {
      if(segundos > '00'){
        segundos--;
        if(segundos <= 9){
          segundos = '0'+segundos;
        }
        if (minutos < '00') {
          minutos=59;
        }
        if (segundos == '00') {
            minutos--;
          if(minutos <= 9){
            minutos = '0'+minutos;
          }
            if (horas <= '00') {
              horas='00';
            }
            if (minutos == '00') {
                horas--;
                if (horas <= 9) {
                  horas = '0'+horas;
                }
            }
          }
      }else{
        segundos = 59;
      }
      
      nuevoReloj = `  ${horas <= 9 ? '0'+horas :horas}:${minutos<= 9 ? '0'+minutos:minutos}:${segundos} `;
      this.tiempo = nuevoReloj;
    }, relojsetinterval);
  }

  obtenerReloj(){
    const user  = this.userProv.getSesion();
      let objModel = {
        idChofer:user.idChofer
      }
        this.peticion.Post('Choferes/ObtenerReloj',objModel).then(result=>{
          let re = JSON.parse(result['Model']);
          this.relojReglas(re[0].Reloj);
        }).catch(errr=>{
          console.log(errr)
      });
  }
  relojReglas(reloj){
    let RelojTimer = '';
    if(reloj >= '12:00:00.000'){
      RelojTimer = '00:00:00';
    } else{
      let hora = reloj.split('.')[0];
      let Regla:any = '11:59:60';
      let segundos = (Regla.split(':')[2] - hora.split(':')[2]);
      let minutos = (Regla.split(':')[1] - hora.split(':')[1]);
      let horas = (Regla.split(':')[0] - hora.split(':')[0]);
      RelojTimer = horas +":"+minutos+":"+segundos ;
    } 
    this.temporizador(RelojTimer);
    this.tiempo = RelojTimer;
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
    const user = this.userProv.getSesion();

    let objModel = {
      idChofer: user.idChofer
    }
      this.peticion.Post('Bitacora/ObtenerEstatusActivo',objModel).then(result=>{
     let re = JSON.parse(result['Model']);
     this.idEstatusr = re.idEstatus;
        if(this.idEstatusr!=undefined){
          this.obtenerColo(this.idEstatusr)
        }
      }).catch(errr=>{
        console.log(errr)
    });
  }
  obtenerColo(idEs){
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
    this.coloranteDrive = 'primary';
    this.coloranteOn = 'primary';
    this.coloranteSB = 'primary';
    this.coloranteOff = 'success';
  this.CrearEditarStatus(3);
  }
  SB(){
    this.coloranteDrive = 'primary';
    this.coloranteOn = 'primary';
    this.coloranteSB = 'success';
  this.CrearEditarStatus(4);
    this.coloranteOff = 'primary';
  }
  ON(){
    this.coloranteDrive = 'primary';
    this.coloranteOn = 'success';
  this.CrearEditarStatus(1);
    this.coloranteSB = 'primary';
    this.coloranteOff = 'primary';
  }
  BotonesStatus
  DRIVE(){
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
