import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Certificacion } from 'src/app/model/certificado.model';
import { ChoferesService } from 'src/app/providers/choferes.service';

@Component({
  selector: 'app-certificacionesLst',
  templateUrl: './certificaciones.page.html',
  styleUrls: ['./certificaciones.page.scss'],
})
export class CertificacionesLsPage implements OnInit {
  lstCertificaciones: Certificacion[] = [];
  constructor(public navCtrl: NavController, public chofProv: ChoferesService) { }

  ngOnInit() {
    this.obtenerAllCertificados();
  }
  newInspeccion(){
    this.navCtrl.navigateForward('certificar-inspeccion');
  }
  abrirEditar(item){
    let navigationExtras: NavigationExtras = {
      state: {
        certificado: item,
      } 
    };
    this.navCtrl.navigateForward('certificar-inspeccion', navigationExtras);

    console.log(item);
    
  }
  obtenerAllCertificados(){
    this.chofProv.obtenerCertificado().then(res=>{
      let datos2 = JSON.parse(res['Model']);
      this.lstCertificaciones = datos2;
      console.log(this.lstCertificaciones);
      
    })
  }
}
