import { Component, OnInit } from '@angular/core';
import { DblocalService } from 'src/app/services/database/dblocal.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  constructor(private db: DblocalService) { }

  ngOnInit() {
    this.db.abrirBaseDeDatos();
  }

}
