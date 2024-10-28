import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
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
  usuarioLogeado: any [] = [];
  extrasUsuarioLogeado: any = {};

  constructor(private db: DblocalService, private api: ApiService, private router: Router) { }

  ngOnInit() {
    let extras = this.router.getCurrentNavigation()?.extras;
    if(extras?.state) {
      this.extrasUsuarioLogeado = extras.state["usuario"]
    }
    this.buscarSedes();
    this.usuarioLogeado = this.extrasUsuarioLogeado;    
    console.log(this.extrasUsuarioLogeado);
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
    this.router.navigate(["login"]);   
  }

  irModificarContrasena() {
    let extras: NavigationExtras = {
      state: {
        "usuario": this.usuarioLogeado 
      },
      replaceUrl: true
    }
    this.router.navigate(["modificar-contrasena"], extras)
  }
}
