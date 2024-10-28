import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-modificar-contrasena',
  templateUrl: './modificar-contrasena.page.html',
  styleUrls: ['./modificar-contrasena.page.scss'],
})
export class ModificarContrasenaPage implements OnInit {

  usuarioLogeado: any [] = [];
  extrasUsuarioLogeado: any = {};
  mdl_correo: string = '';
  mdl_carrera: string = '';
  mdl_contrasena: string = '';

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    let extras = this.router.getCurrentNavigation()?.extras;
    if(extras?.state) {
      this.extrasUsuarioLogeado = extras.state["usuario"]
    }
    this.usuarioLogeado = this.extrasUsuarioLogeado;
    console.log(this.extrasUsuarioLogeado)

    this.mdl_correo = this.extrasUsuarioLogeado.correo;
    this.mdl_carrera = this.extrasUsuarioLogeado.carrera;
  }

  volverPagePrincial() {
    this.router.navigate(["principal"])
  }

  async modificarCarreraContrasena() {
    let datos = this.api.modificarUsuarioApi(this.mdl_correo, this.mdl_contrasena, this.mdl_carrera);
    let respuesta = await lastValueFrom(datos);

    let json_texto = JSON.stringify(respuesta);
    let json = JSON.parse(json_texto);

    if(json.status == "success") {
      console.log(json.message)
      console.log(this.extrasUsuarioLogeado.correo, "->", this.mdl_correo)
      console.log(this.extrasUsuarioLogeado.contrasena, "->", this.mdl_contrasena)
      console.log(this.extrasUsuarioLogeado.carrera, "->", this.mdl_carrera)
    } else {
      console.log(json.message)
    }
  }
}
