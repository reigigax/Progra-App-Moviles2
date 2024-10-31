import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { DblocalService } from 'src/app/services/database/dblocal.service';

@Component({
  selector: 'app-modificar-contrasena',
  templateUrl: './modificar-contrasena.page.html',
  styleUrls: ['./modificar-contrasena.page.scss'],
})
export class ModificarContrasenaPage implements OnInit {

  mdl_correo: string = '';
  mdl_carrera: string = '';
  mdl_contrasena: string = '';

  constructor(private api: ApiService, private dblocal: DblocalService, private router: Router, private toastController: ToastController) { }

  async ngOnInit() {
    this.mdl_correo = '';
    this.mdl_carrera = '';
    this.mdl_contrasena = '';

    let usuarioLogeado = await this.dblocal.consultarUsuarioLogeado();
    
    this.mdl_correo = usuarioLogeado.correo.replace(/[ '"]+/g, '');
    this.mdl_carrera = usuarioLogeado.carrera.replace(/[ '"]+/g, '');
  }

  volverPagePrincial() {
    this.router.navigate(["principal"])
  }

  async modificarCarreraContrasena() {
    let datos = this.api.modificarUsuarioApi(this.mdl_correo, this.mdl_contrasena, this.mdl_carrera);
    let respuesta = await lastValueFrom(datos) as {status: string, message: string};

    console.log("Respuesta de la API", respuesta);
    
    if(respuesta.status === 'success') {
      this.alerta_confirmacion(`${respuesta.message}`);
      this.router.navigate(["principal"])
    } else if (respuesta.status === 'error'){
      this.alerta_error(`Error: ${respuesta.message}`);
    }
  } catch (error: any){
    console.error("Error en la creación del usuario:", error);
  }
  
  async alerta_confirmacion(message: string){
    const alertaToast = await this.toastController.create({
        message: message,
        duration: 3000,
        position: 'bottom',
        cssClass: 'custom-toast',
        icon: 'checkmark-circle-outline',
        color: 'success'
    });
    await alertaToast.present();
  }
  
  async alerta_error(message: string){
    const alertaToast = await this.toastController.create({
        message: message,
        duration: 3000,
        position: 'bottom',
        cssClass: 'custom-toast',
        icon: 'alert-circle-outline',
        color: 'warning'
    });
    await alertaToast.present();
  }

  
}
