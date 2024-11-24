import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { DblocalService } from 'src/app/services/database/dblocal.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  correoUserLogeado: string = '';
  asistenciasApi: any [] = [];
  codigosQr: Barcode[] = [];
  isSupported = false;

  constructor( private router: Router, private dblocal: DblocalService, private api: ApiService, private alertController: AlertController) { }

  async ngOnInit() {
    this.obtenerAsistenciasRegistradas();
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    console.log("QrScanner: QRlog")
  }

  async solicitarPermisos(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    console.log("QrScann: Permisos de Camara concedidos");
    return camera === 'granted' || camera === 'limited'
  }

  async indicarAlerta(): Promise<void> {
    const alerta = await this.alertController.create({
      header: 'Permiso Denegado',
      message: 'Porfavor autoriza el permiso para usutizar la camara para escanear el codigo QR',
      buttons: ['OK'],
    });
  }

  async scannear(): Promise<void> {
    const autorizaciones = await this.solicitarPermisos();
    let datosAsistencia: any [] = [];
    
    if(!autorizaciones) {
      this.indicarAlerta();
      return;
    }
    console.log("QrScann: Escaneando QR");
    const { barcodes } = await BarcodeScanner.scan();
    this.codigosQr.push(...barcodes);

    let totalCodigos = this.codigosQr.length
    totalCodigos = totalCodigos -1;

    let datosQr = this.codigosQr[totalCodigos].rawValue
    datosAsistencia = datosQr.split("|",3)

    let fechaAsistencia = datosAsistencia[2]
    let siglaAsignaturaAsistencia = datosAsistencia[0]

    let usuarioLogeado = await this.dblocal.consultarUsuarioLogeado();
    this.correoUserLogeado = await usuarioLogeado.correo.replace(/[ '"]+/g, '');

    let datos = this.api.marcarAsistenciaQrApi(siglaAsignaturaAsistencia,this.correoUserLogeado,fechaAsistencia);
    let respuesta = await lastValueFrom(datos);
 
    let json_texto = JSON.stringify(respuesta);
    let json = JSON.parse(json_texto);

    console.log("QrScann: Subiendo Datos Qr. Status:", json.status, ", Respuesta: ", json.message);
    
    this.obtenerAsistenciasRegistradas();
  }

  async obtenerAsistenciasRegistradas() {
    this.asistenciasApi = [];

    let usuarioLogeado = await this.dblocal.consultarUsuarioLogeado();
    this.correoUserLogeado = await usuarioLogeado.correo.replace(/[ '"]+/g, '');

    let datos = this.api.obtenerAsistenciaApi(this.correoUserLogeado);
    let respuesta = await lastValueFrom(datos);

    let json_texto = JSON.stringify(respuesta);
    let json = JSON.parse(json_texto);

    console.log("RAsist", json[0].length) 
    
    for(let y = 0; y < json[0].length; y++){
      let x = 0
      let asistencias: any = {};
      let diasPresente: number = 0;
      let diasAusente: number = 0;
      let diasTotales: number = 0;
      let porcentajeTotal: number = 0;
      let estiloIcon: string = '';
      let nombreIcono: string = '';
      let estiloFondo: string = '';

      asistencias.cursoSiglaApi = json[x][y].curso_sigla;
      asistencias.cursoNombreApi = json[x][y].curso_nombre;
      asistencias.presenteApi = json[x][y].presente;
      asistencias.ausenteApi = json[x][y].ausente;

      diasPresente = parseInt(json[x][y].presente);
      diasAusente = parseInt(json[x][y].ausente);
      diasTotales = diasAusente + diasPresente;

      porcentajeTotal = (diasPresente/diasTotales)* 100;
      asistencias.porcentajeAsistencias = porcentajeTotal;

      if(porcentajeTotal >= 75){
        nombreIcono = 'checkmark-circle';
        estiloIcon = 'secondary';
        estiloFondo = 'asistencia-card-success';
      } else {
        nombreIcono = 'alert-circle';
        estiloIcon = 'warning';
        estiloFondo = 'asistencia-card-warning';
      }
      
      if(porcentajeTotal == 100) {
        nombreIcono = 'checkmark-done-circle';
        estiloIcon = 'primary';
        estiloFondo = 'asistencia-card-success';  
      }

      if(porcentajeTotal == 0) {
        nombreIcono = 'close-circle';
        estiloIcon = 'danger';
        estiloFondo = 'asistencia-card-danger';
      }

      asistencias.iconStyle = estiloIcon;
      asistencias.fondoStyle = estiloFondo;
      asistencias.iconName = nombreIcono;

      this.asistenciasApi.push(asistencias);
    }
  }

  volverPagePrincipal() {
    this.router.navigate(["principal"])
  }
}