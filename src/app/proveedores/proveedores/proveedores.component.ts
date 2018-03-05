import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../servicios/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  /*mensaje: string;*/
  proveedores: any;
  /*Inicializamos el servicio de esta manera. Siempre se hace asi*/
  constructor(private _proveedoresService: ProveedoresService) {}

  /*Cada vez que empieza el ciclo de vida de este componente se ejecuta lo que
    hay dentro de este metodo*/
  ngOnInit() {
     this.proveedores = this._proveedoresService.getProveedores();
  }

}
