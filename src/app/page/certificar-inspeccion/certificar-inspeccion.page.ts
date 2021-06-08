import { Component, OnInit } from '@angular/core';
import { PeticionProvider } from 'src/app/providers/peticiones';
import { MenuController, NavController } from '@ionic/angular';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-certificar-inspeccion',
  templateUrl: './certificar-inspeccion.page.html',
  styleUrls: ['./certificar-inspeccion.page.scss'],
})
export class CertificarInspeccionPage implements OnInit {

  constructor(private petProv:PeticionProvider,
              private menu:MenuController,
              private navCtrl:NavController) { }

  ngOnInit() {
    console.log('haciendo click');
  }


  EnviarCorre(){
    console.log('haciendo click');
    var docDefinition = {
      content: [
        "HELLO WORLD",
      ]
    };
    let pdfobj= pdfMake.createPdf(docDefinition);
    pdfobj.download();

    // let objModel = {
    //     subject:'Mensaje',
    //     emails:'sirakonadan@gmail.com',
    //     msg:'hola'
    //  }
    //  this.petProv.Post('Choferes/EnviarCorreo',objModel).then(result=>{ 
    // // lstDatos = JSON.parse(result['Model']);
    // }).catch(errr=>{
    // console.log(errr)
    // });
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
    this.navCtrl.navigateRoot('dashboard');
  }
  EnviarADashBoard(){
    this.navCtrl.navigateRoot('bitacora');
  }

}
