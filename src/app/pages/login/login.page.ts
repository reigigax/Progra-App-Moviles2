import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_correo: string = '';
  mdl_contrasena: string = '';

  constructor(private router: Router, private api: ApiService, private toastController: ToastController) { }

  ngOnInit() {
  }

  navegarCrearUsuario () {
    this.router.navigate(['crear-usuario']);
  }

  async iniciarSesion() {

    let datos = this.api.loginUsuarioApi(this.mdl_correo, this.mdl_contrasena);
    let respuesta = await lastValueFrom(datos) as {status: string, message: string};

    console.log("Respuesta de la API", respuesta);
    
    if(respuesta.status === 'success') {
      this.alerta_confirmacion(`¡Bienvenido!`);
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