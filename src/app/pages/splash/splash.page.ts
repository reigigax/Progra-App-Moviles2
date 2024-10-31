import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DblocalService } from 'src/app/services/database/dblocal.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router, private dblocal: DblocalService) { }

  ngOnInit() {
    this.dblocal.crearTablaUsuario();

    setTimeout(async () => {
      let usuariosLogeados = await this.dblocal.verificarUsuarioLogeado();
      if (usuariosLogeados == "0"){
        this.router.navigate(['login']);
      } else {
        this.router.navigate(["principal"]);
      }
    }, 1000);
  }

}
