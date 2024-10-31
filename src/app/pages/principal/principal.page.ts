import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { DblocalService } from 'src/app/services/database/dblocal.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  lista_sedes: any [] = [];

  constructor(private dblocal: DblocalService, private api: ApiService, private router: Router) { }

  async ngOnInit() {
    this.buscarSedes();
  }

  async buscarSedes() {
    this.lista_sedes = [];

    let datos = this.api.buscarSedesApi();
    let respuesta = await lastValueFrom(datos);

    let json_texto = JSON.stringify(respuesta);
    let json = JSON.parse(json_texto);

    console.log(json[0].length)

    for(let y = 0; y < json[0].length; y++) {
      let x = 0;
      let sedes: any = {};

      sedes.nombre = json[x][y].NOMBRE;
      sedes.direccion = json[x][y].DIRECCION;
      sedes.telefono = json[x][y].TELEFONO;
      sedes.horarioAtencion = json[x][y].HORARIO_ATENCION;
      sedes.imagen = json[x][y].IMAGEN;

      this.lista_sedes.push(sedes);
    }
  }
  
  cerrarSesion() {
    this.dblocal.eliminarSesionUsuario();
    this.router.navigate(["login"]);   
  }

  irModificarContrasena() {
    this.router.navigate(["modificar-contrasena"])
  }
}
