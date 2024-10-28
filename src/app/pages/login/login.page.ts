import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuarioLogeado: any [] = []
  mdl_correo: string = '';
  mdl_contrasena: string = '';

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
  }

  navegarCrearUsuario () {
    this.router.navigate(['crear-usuario']);
  }

  async iniciarSesion() {
    this.usuarioLogeado = [];

    let datos = this.api.loginUsuarioApi(this.mdl_correo, this.mdl_contrasena);
    let respuesta = await lastValueFrom(datos);

    let json_texto = JSON.stringify(respuesta);
    let json = JSON.parse(json_texto); 
    
    if(json.status == "success"){
      console.log(json.status, ":", json.message);
      this.usuarioLogeado = json.usuario;

      let extras: NavigationExtras = {
        state: {
          "usuario": this.usuarioLogeado 
        },
        replaceUrl: true
      }
      console.log(this.usuarioLogeado);

      this.router.navigate(["principal"], extras);
    } else {
      console.log(json.status, ":", json.message)
    }
  }
}