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
  }

}