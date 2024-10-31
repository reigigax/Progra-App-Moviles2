import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DblocalService {

  private dblocal: SQLiteObject | null = null

  constructor(private sqlite: SQLite) { }

  async abrirBaseDeDatos () {
      this.dblocal = await this.sqlite.create({
      name: "datos.db",
      location: "default"
    });
    console.log("DBLocalMSG: Base de Datos Local Ingresada Correctamente");
  }

  async crearTablaUsuario() {
    await this.abrirBaseDeDatos();
    await this.dblocal?.executeSql("CREATE TABLE IF NOT EXISTS USUARIO(CORREO VARCHAR(75), NOMBRE VARCHAR(50), APELLIDO VARCHAR(50), CARRERA VARCHAR(75))", []);
    console.log("DBLocalMSG: Tabla 'USUARIO' Creada Correctamente")
  }

  async guardarSesionUsuario(correo: string, nombre: string, apellido: string, carrera: string) {
    try {
      await this.abrirBaseDeDatos();
      await this.crearTablaUsuario();
      await this.dblocal?.executeSql("INSERT INTO USUARIO VALUES(?, ?, ?, ?)", [correo, nombre, apellido, carrera]);
      console.log("DBLocalMSG: Sesion Guardada Correctamente")
    } catch(error) {
      console.log("DBLocalMSG: Ocurrio un Problema al Guardar el Usuario  -- Error: "+ JSON.stringify(error) +" --")
    }
  }

  async verificarUsuarioLogeado() {
    await this.abrirBaseDeDatos();
    let respuesta = await this.dblocal?.executeSql("SELECT COUNT(CORREO) AS USUARIOS_LOGEADOS FROM USUARIO", []);
    let cantidadUsuarios = JSON.stringify(respuesta.rows.item(0).USUARIOS_LOGEADOS);
    console.log("DBLocalMSG: " + JSON.stringify(respuesta.rows.item(0).USUARIOS_LOGEADOS));
    return cantidadUsuarios;
  }

  async eliminarSesionUsuario() {
    try {
      await this.dblocal?.executeSql("DROP TABLE USUARIO", []);
      console.log("DBLocalMSG: Tabla 'USUARIO' Eliminada Exitosamente");
    } catch(error) {
      console.log("DBLocalMSG: Ocurrio un Problema al Eliminar la Sesion  -- Error: "+ JSON.stringify(error) +" --");
    }
  }

  async consultarUsuarioLogeado() {
    try {
      await this.abrirBaseDeDatos();
      let usuario: any = {}
      let respuesta = await this.dblocal?.executeSql("SELECT * FROM USUARIO", []);

      usuario = {
        correo: JSON.stringify(respuesta.rows.item(0).CORREO),
        nombre: JSON.stringify(respuesta.rows.item(0).NOMBRE),
        apellido: JSON.stringify(respuesta.rows.item(0).APELLIDO),
        carrera: JSON.stringify(respuesta.rows.item(0).CARRERA)
      }

      console.log("DBLocalMSG: Usuario Encontrado y Almacenado en JSON");
      return usuario;
    } catch(error) {
      console.log("DBLocalMSG: Ocurrio un Error al Buscar el Usuario  -- Error: "+ JSON.stringify(error) +" --");
    }
  }
}