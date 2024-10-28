import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';

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

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
  }

  async crearUsuario() {
    let datos = this.api.creacioUsuarioApi(this.mdl_correo, this.mdl_contrasena, this.mdl_nombre, this.mdl_apellido, this.mdl_carrera);
    let respuesta = await lastValueFrom(datos);

    let json_texto = JSON.stringify(respuesta);
    let json = JSON.parse(json_texto);

    if(json.status == "success") {
      console.log(json.status,":", json.message)
      this.router.navigate(["login"])
    } else {
      console.log(json.status,":", json.message)
    }
  }
}
