import { Component, OnInit } from '@angular/core';
import { PeticionProvider } from 'src/app/providers/peticiones';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {
  Certificacion,
  OtroCertificacion,
} from 'src/app/model/certificado.model';
import { ChoferesService } from 'src/app/providers/choferes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioProvider } from 'src/app/providers/login';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-certificar-inspeccion',
  templateUrl: './certificar-inspeccion.page.html',
  styleUrls: ['./certificar-inspeccion.page.scss'],
})
export class CertificarInspeccionPage implements OnInit {
  frnEstacionamiento: any[] = [];
  frnMantenimiento: any[] = [];
  frnDispositivo: any[] = [];
  frnEquipo: any[] = [];
  frnBocina: any[] = [];
  frnReflectores: any[] = [];
  frnRetrovisores: any[] = [];
  frnDireccion: any[] = [];
  frnNeumaticos: any[] = [];
  frnRuedas: any[] = [];
  frnParabrisas: any[] = [];
  certificar: Certificacion;
  Otroscertificar: OtroCertificacion;
  constructor(
    private petProv: PeticionProvider,
    private menu: MenuController,
    private navCtrl: NavController,
    public chofProv: ChoferesService,
    public alertController: AlertController,
    public route: ActivatedRoute,
    public router: Router,
    public userProv: UsuarioProvider
  ) {
    this.certificar = new Certificacion();
    this.Otroscertificar = new OtroCertificacion();
    this.validarTablas();

    this.route.queryParams.subscribe((params) => {      
      let navParams = this.router.getCurrentNavigation().extras.state;
      if (navParams && navParams.certificado) {
        this.certificar =  navParams.certificado;
        this.validarOtrosYaGuardados();
      }
    });
    if (!this.certificar || !this.certificar.idChofer) {
      const user = this.userProv.getSesion();
      this.certificar.idChofer = user.idChofer;
    }
  }

  ngOnInit() {
  }

  EnviarCorre() {
    // var docDefinition = {
    //   content: [
    //     "HELLO WORLD",
    //   ]
    // };
    // let pdfobj= pdfMake.createPdf(docDefinition);
    // pdfobj.download();

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

  EntrarABitacora() {
    this.navCtrl.navigateRoot('dashboard');
  }
  EnviarADashBoard() {
    this.navCtrl.navigateRoot('bitacora');
  }

  validarTablas() {
    this.frnEstacionamiento = [
      {
        id: 1,
        title: 'Dificil de liberar',
      },
      {
        id: 2,
        title: 'Sueltos o ineficaces',
      },
      {
        id: 3,
        title: 'No se libera',
      },
      {
        id: 4,
        title: 'Otro',
      },
    ];
    this.frnMantenimiento = [
      {
        id: 1,
        title: 'El compreso de aire no funciona',
      },
      {
        id: 2,
        title: 'Temblor,vibracion,chachara',
      },
      {
        id: 3,
        title: 'Se arrastran',
      },
      {
        id: 4,
        title: 'Fuga de aire',
      },
      {
        id: 5,
        title: 'perdida de liquido',
      },
      {
        id: 6,
        title: 'Sobrecalentamiento o funciona a alta temperatura',
      },
      {
        id: 7,
        title: 'Gripado',
      },
      {
        id: 8,
        title: 'Fuga La luz de advertencia no funciona',
      },
      {
        id: 9,
        title: 'la luz de advertencia esta encendida',
      },
      {
        id: 10,
        title: 'sueltos e ineficaces',
      },
      {
        id: 11,
        title: 'Otro',
      },
    ];
    this.frnDispositivo = [
      {
        id: 1,
        title: 'Quinta rueda agrietada o dañada',
      },
      {
        id: 2,
        title: 'Otro',
      },
    ];
    this.frnEquipo = [
      {
        id: 1,
        title: 'Falta de extinguidor',
      },
      {
        id: 2,
        title: 'El extinguidor no esta cargado',
      },
      {
        id: 3,
        title: 'Faltan las banderas y luces de emergencia',
      },
      {
        id: 4,
        title: 'Faltan los triangulos reflectantes',
      },
      {
        id: 5,
        title: 'Faltan bombillas o fusibles de repuesto',
      },
      {
        id: 6,
        title: 'Falta faro sellado de repuesto',
      },
      {
        id: 7,
        title: 'Otro',
      },
    ];
    this.frnBocina = [
      {
        id: 1,
        title: 'Bocina de aire inutilizable',
      },
      {
        id: 2,
        title: 'Bocina electrica inutilizable',
      },
      {
        id: 3,
        title: 'Otro',
      },
    ];
    this.frnReflectores = [
      {
        id: 1,
        title: 'Agrietado o roto',
      },
      {
        id: 2,
        title: 'Mal enfocado',
      },
      {
        id: 3,
        title: 'Intermitentes de urgencia inutilizables',
      },
      {
        id: 4,
        title: 'Luz de freno inutilizable',
      },
      {
        id: 5,
        title: 'Luz de cruce inutilizable',
      },
      {
        id: 6,
        title: 'Luz interior inutilizable',
      },
      {
        id: 7,
        title: 'intermitente de giro izquierdo inutilizable',
      },
      {
        id: 8,
        title: 'intermitente de giro derecho inutilizable',
      },
      {
        id: 9,
        title: 'Faltan',
      },
      {
        id: 10,
        title: 'Otro',
      },
    ];
    this.frnRetrovisores = [
      {
        id: 1,
        title: 'Roto o agrietado',
      },
      {
        id: 2,
        title: 'Mal ajustadas',
      },
      {
        id: 3,
        title: 'Sueltas o mal instaladas',
      },
      {
        id: 4,
        title: 'Faltan',
      },
      {
        id: 5,
        title: 'Otro',
      },
    ];
    this.frnDireccion = [
      {
        id: 1,
        title: 'Se bloquea o se agarra',
      },
      {
        id: 2,
        title: 'Gira o tira hacia la izquierda',
      },
      {
        id: 3,
        title: 'Gira o tira hacia la derecha',
      },
      {
        id: 4,
        title: 'Nivel de liquido inadecuado',
      },
      {
        id: 5,
        title: 'Perdida de liquido',
      },
      {
        id: 6,
        title: 'Volante flojo o con demasiado juego',
      },
      {
        id: 7,
        title: 'Sobrecalentamiento o funciona a alta temperatura',
      },
      {
        id: 8,
        title: 'Otro',
      },
    ];
    this.frnNeumaticos = [
      {
        id: 1,
        title: 'Abultado o hinchado',
      },
      {
        id: 2,
        title: 'Neumatico pinchado o fuga de aire',
      },
      {
        id: 3,
        title: 'Mal inflado',
      },
      {
        id: 4,
        title: 'La banda de rodamiento no es lo bastante profunda',
      },
      {
        id: 5,
        title: 'Sueltas o mal instaladas',
      },
      {
        id: 6,
        title: 'Faltan',
      },
      {
        id: 7,
        title: 'Separacion de la banda de rodamiento o de la banda lateral',
      },
      {
        id: 8,
        title: 'Otro',
      },
    ];
    this.frnRuedas = [
      {
        id: 1,
        title: 'Torcidas, agrietadas o dañadas',
      },
      {
        id: 2,
        title: 'Sellos del eje que gotean',
      },
      {
        id: 3,
        title: 'Sueltas o mal instaladas',
      },
      {
        id: 4,
        title: 'Faltan',
      },
      {
        id: 5,
        title: 'Enmohecido o corroido',
      },
      {
        id: 6,
        title: 'Otro',
      },
    ];
    this.frnParabrisas = [
      {
        id: 1,
        title: 'Rocio inadecuad',
      },
      {
        id: 2,
        title: 'Limpieza inadecuada',
      },
      {
        id: 3,
        title: 'Sueltas o mal instaladas',
      },
      {
        id: 4,
        title: 'Faltan',
      },
      {
        id: 5,
        title: 'Otro',
      },
    ];
  }

  saveCertificado() {
    if (this.certificar.FrenosEstacionamiento && this.certificar.idChofer > 0) {
      this.chofProv.saveCertificado(this.generarObj()).then(
        (res) => {
          this.presentAlertSucced('EXITO!','Cambios guardados correctamente');
          this.navCtrl.navigateForward('certificacionesLst');
        },
        (err) => {
          console.log(err);
          this.presentAlertSucced('ERROR!','ERROR al realizar cambios')
        }
      );
    }
  }
  
  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ingreses los datos para enviar el correo',
      inputs: [
        {
          name: 'Correo',
          type: 'text',
          placeholder: 'Inserte Correo',
        },
        {
          name: 'Asunto',
          type: 'text',
          placeholder: 'Inserte un Asunto',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Enviar',
          handler: (res) => {
            console.log('Confirm Ok', res);
            this.sendCorreo(res);
          },
        },
      ],
    });

    await alert.present();
  }

  sendCorreo(correo) {
  let objModel = {
    subject: correo.Asunto,
    msg: this.generarBody(),
    emails: correo.Correo,
  }
    if (correo.Correo != '') {
    this.petProv.Post('Choferes/EnviarCorreo',objModel).then(result=>{
        this.presentAlertSucced('EXITO!','Correo enviado correctamente')
      }).catch(errr=>{
        this.presentAlertSucced('ERROR','Error al enviar correo verifique que los datos esten correctos')
      console.log(errr)
      });
    }
  }

  generarBody(){
    let msg = ''
    msg = `
    <strong> Frenos (de estacionamiento): </strong> ${this.certificar.FrenosEstacionamiento} <br>
    <strong> Frenos (Mantenimiento): </strong> ${this.certificar.FrenosMantenimiento} <br>
    <strong> Dispositivo de acoplamiento: </strong> ${this.certificar.DispositivosAcoplamiento} <br>
    <strong> Equipo de urgencia: </strong> ${this.certificar.EquipoDeUrgencia} <br>
    <strong> Bocina: </strong> ${this.certificar.Bocina} <br>
    <strong> Luces y reflectores: </strong> ${this.certificar.LucesYReflectores} <br>
    <strong> Retrovisores: </strong> ${this.certificar.Retrovisores} <br>
    <strong> Direccion: </strong> ${this.certificar.Direccion} <br>
    <strong> Neumaticos: </strong> ${this.certificar.Neumaticos} <br>
    <strong> Ruedas y llantas: </strong> ${this.certificar.RuedasYLlantas} <br>
    <strong> Limpia para brisas: </strong> ${this.certificar.Limpiaparabrisas} <br>
    <strong> Otro: </strong> ${this.certificar.Otro} <br>
    <strong> DIRECCION: </strong> ${this.certificar.UbicacionDeInspeccion} <br>
    <strong> CIUDAD: </strong> ${this.certificar.Ciudad} <br>
    <strong> ESTADO: </strong> ${this.certificar.Estado} <br>
    <strong> PAIS: </strong> ${this.certificar.Pais} <br>
    <strong> OBSERVACIONES: </strong> ${this.certificar.Observaciones} <br>    
    <strong> Tipo de inspección: </strong> ${this.certificar.TipoInspeccion} <br>    
    `
    return msg;
  }

  async presentAlertSucced(Title: string, msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: Title,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  generarObj(){
    const user = this.userProv.getSesion();
    let modal: Certificacion = {
      id: this.certificar.id ? this.certificar.id : 0,
      idChofer:  this.certificar.idChofer ? this.certificar.idChofer : user.idChofer,
      FrenosEstacionamiento: this.certificar.FrenosEstacionamiento == 'Otro' ? this.Otroscertificar.FrenosEstacionamiento : this.certificar.FrenosEstacionamiento,
      FrenosMantenimiento: this.certificar.FrenosMantenimiento == 'Otro' ? this.Otroscertificar.FrenosMantenimiento : this.certificar.FrenosMantenimiento,
      DispositivosAcoplamiento: this.certificar.DispositivosAcoplamiento == 'Otro' ? this.Otroscertificar.DispositivosAcoplamiento : this.certificar.DispositivosAcoplamiento,
      EquipoDeUrgencia: this.certificar.EquipoDeUrgencia == 'Otro' ? this.Otroscertificar.EquipoDeUrgencia : this.certificar.EquipoDeUrgencia,
      Bocina: this.certificar.Bocina == 'Otro' ? this.Otroscertificar.Bocina : this.certificar.Bocina,
      LucesYReflectores: this.certificar.LucesYReflectores == 'Otro' ? this.Otroscertificar.LucesYReflectores : this.certificar.LucesYReflectores,
      Retrovisores: this.certificar.Retrovisores == 'Otro' ? this.Otroscertificar.Retrovisores : this.certificar.Retrovisores,
      Direccion: this.certificar.Direccion == 'Otro' ? this.Otroscertificar.Direccion : this.certificar.Direccion,
      Neumaticos: this.certificar.Neumaticos == 'Otro' ? this.Otroscertificar.Neumaticos : this.certificar.Neumaticos,
      RuedasYLlantas: this.certificar.RuedasYLlantas == 'Otro' ? this.Otroscertificar.RuedasYLlantas : this.certificar.RuedasYLlantas,
      Limpiaparabrisas: this.certificar.Limpiaparabrisas == 'Otro' ? this.Otroscertificar.Limpiaparabrisas : this.certificar.Limpiaparabrisas,
      Otro: this.certificar.Otro ? this.certificar.Otro : '',
      UbicacionDeInspeccion: this.certificar.UbicacionDeInspeccion ? this.certificar.UbicacionDeInspeccion : '',
      Observaciones: this.certificar.Observaciones ? this.certificar.Observaciones : '',
      NoHayDefectos: this.certificar.NoHayDefectos ? this.certificar.NoHayDefectos : false,
      Ciudad: this.certificar.Ciudad ? this.certificar.Ciudad : '',
      Estado: this.certificar.Estado ? this.certificar.Estado : '',
      Pais: this.certificar.Pais ? this.certificar.Pais : '',
      TipoInspeccion: this.certificar.TipoInspeccion ? this.certificar.TipoInspeccion : ''  
    }
    return modal
  }

  validarOtrosYaGuardados(){    
    if(this.certificar.FrenosEstacionamiento != null && this.frnEstacionamiento.filter(res=> res.title == this.certificar.FrenosEstacionamiento).length == 0){
      this.Otroscertificar.FrenosEstacionamiento = this.certificar.FrenosEstacionamiento;
      this.certificar.FrenosEstacionamiento = 'Otro';
    }
    if(this.certificar.FrenosMantenimiento != null && this.frnMantenimiento.filter(res=> res.title == this.certificar.FrenosMantenimiento).length == 0){
      this.Otroscertificar.FrenosMantenimiento = this.certificar.FrenosMantenimiento;
      this.certificar.FrenosMantenimiento = 'Otro';
    }
    if(this.certificar.DispositivosAcoplamiento != null && this.frnDispositivo.filter(res=> res.title == this.certificar.DispositivosAcoplamiento).length == 0){
      this.Otroscertificar.DispositivosAcoplamiento = this.certificar.DispositivosAcoplamiento;
      this.certificar.DispositivosAcoplamiento = 'Otro';
    }
    if(this.certificar.EquipoDeUrgencia != null && this.frnEquipo.filter(res=> res.title == this.certificar.EquipoDeUrgencia).length == 0){
      this.Otroscertificar.EquipoDeUrgencia = this.certificar.EquipoDeUrgencia;
      this.certificar.EquipoDeUrgencia = 'Otro';
    }
    if(this.certificar.Bocina != null && this.frnBocina.filter(res=> res.title == this.certificar.Bocina).length == 0){
      this.Otroscertificar.Bocina = this.certificar.Bocina;
      this.certificar.Bocina = 'Otro';
    }
    if(this.certificar.LucesYReflectores != null && this.frnReflectores.filter(res=> res.title == this.certificar.LucesYReflectores).length == 0){
      this.Otroscertificar.LucesYReflectores = this.certificar.LucesYReflectores;
      this.certificar.LucesYReflectores = 'Otro';
    }
    if(this.certificar.Retrovisores != null && this.frnRetrovisores.filter(res=> res.title == this.certificar.Retrovisores).length == 0){
      this.Otroscertificar.Retrovisores = this.certificar.Retrovisores;
      this.certificar.Retrovisores = 'Otro';
    }
    if(this.certificar.Direccion != null && this.frnDireccion.filter(res=> res.title == this.certificar.Direccion).length == 0){
      this.Otroscertificar.Direccion = this.certificar.Direccion;
      this.certificar.Direccion = 'Otro';
    }
    if(this.certificar.Neumaticos != null && this.frnNeumaticos.filter(res=> res.title == this.certificar.Neumaticos).length == 0){
      this.Otroscertificar.Neumaticos = this.certificar.Neumaticos;
      this.certificar.Neumaticos = 'Otro';
    }
    if(this.certificar.RuedasYLlantas != null && this.frnRuedas.filter(res=> res.title == this.certificar.RuedasYLlantas).length == 0){
      this.Otroscertificar.RuedasYLlantas = this.certificar.RuedasYLlantas;
      this.certificar.RuedasYLlantas = 'Otro';
    }
    if(this.certificar.Limpiaparabrisas != null && this.frnParabrisas.filter(res=> res.title == this.certificar.Limpiaparabrisas).length == 0){
      this.Otroscertificar.Limpiaparabrisas = this.certificar.Limpiaparabrisas;
      this.certificar.Limpiaparabrisas = 'Otro';
    }
  }
}
