import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ruta: string = 'https://www.s2-studio.cl';

  constructor(private http: HttpClient) { }

  creacioUsuarioApi(inputCorreo: string, inputContrasena: string, inputNombre: string, inputApellido: string, inputCarrera: string) {
    let objeto: any = {}
    objeto.correo = inputCorreo;
    objeto.contrasena = inputContrasena;
    objeto.nombre = inputNombre;
    objeto.apellido = inputApellido;
    objeto.carrera = inputCarrera;

    return this.http.post(this.ruta + '/api_duoc/usuario/usuario_almacenar', objeto).pipe()
  }
  
  loginUsuarioApi(inputCorreo: string, inputContrasena: string) {
    let objeto: any = {}
    objeto.correo = inputCorreo;
    objeto.contrasena = inputContrasena;

    return this.http.post(this.ruta + '/api_duoc/usuario/usuario_login', objeto).pipe()
  }

  buscarSedesApi(){
    return this.http.get(this.ruta + '/api_duoc/usuario/sedes_obtener').pipe()
  }

  modificarUsuarioApi(inputCorreo: string, inputContrasena: string, inputCarrera: string) {
    let objeto: any = {}
    objeto.correo = inputCorreo;
    objeto.contrasena = inputContrasena;
    objeto.carrera = inputCarrera;

    return this.http.patch(this.ruta + '/api_duoc/usuario/usuario_modificar', objeto).pipe()
  }
}
