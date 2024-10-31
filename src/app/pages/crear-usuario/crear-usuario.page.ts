import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  mdl_correo: string = '';
  mdl_contrasena: string = '';
  mdl_nombre: string = '';
  mdl_apellido: string = '';
  mdl_carrera: string = '';

  constructor(private router: Router, private api: ApiService, private toastController: ToastController) { }

  ngOnInit() {
  }

  async crearUsuario() {
    let datos = this.api.creacioUsuarioApi(this.mdl_correo, this.mdl_contrasena, this.mdl_nombre, this.mdl_apellido, this.mdl_carrera);
    let respuesta = await lastValueFrom(datos) as {status: string, message: string};

    console.log("Respuesta de la API", respuesta);
  
    if(respuesta.status === 'success') {
      this.alerta_confirmacion(`${respuesta.message}`);
      this.router.navigate(["login"])
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
  
  volverLogin() {
    this.router.navigate([("login")])
  }

}
