import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_correo: string = '';
  mdl_contrasena: string = '';

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
    console.log(this.mdl_correo)
  }

  navegarCrearUsuario () {
      this.router.navigate(['crear-usuario']);
  }

  async iniciarSesion() {
    let extras: NavigationExtras = {
      state: {
        "correoUsuario": this.mdl_correo
      },
      replaceUrl: true
    }

    let datos = this.api.validacionLogin(this.mdl_correo, this.mdl_contrasena);
    let respuesta = await lastValueFrom(datos);

    let json_texto = JSON.stringify(respuesta);
    let json = JSON.parse(json_texto);

    if(json[0].RESPUESTA == 'LOGIN OK') {
      console.log(json[0].RESPUESTA)
      this.router.navigate(['principal'], extras)
    } else {
      console.log(json[0].RESPUESTA)
    }
  }


}
