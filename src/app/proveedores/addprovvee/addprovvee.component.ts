import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-addprovvee',
  templateUrl: './addprovvee.component.html',
  styleUrls: ['./addprovvee.component.css']
})
export class AddprovveeComponent implements OnInit {

/* ViewChild es un decorador que identifica el ID que dimos al formularario al definirlo y luego le decimos que es de tipo NgForm*/
  @ViewChild('formpro') formpro: NgForm;
  proveedor: any;

  provincias: string[] = [ 'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz',
     'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ciudad Real', 'Córdoba',
     'La Coruña', 'Cuenca', 'Gerona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca',
     'IslasBaleares', 'Jaén', 'León', 'Lérida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense',
     'Palencia', 'Las Palmas', 'Pontevedra', 'La Rioja', 'Salamanca', 'Segovia', 'Sevilla', 'Soria',
     'Tarragona', 'Santa Cruz de Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya',
     'Zamora', 'Zaragoza' ];

  constructor() {
    /* inicializamos el objeto proveedor*/
    this.proveedor = {
      nombre: '',
      cif: '',
      direccion: '',
      cp: '',
      localidad: '',
      provincia: '',
      telefono: null,
      email: '',
      contacto: ''
    };
  }

  ngOnInit() {
  }

/* metodo que se ejecuta el evento onSubmit del formulario*/
  envioDatos() {
    /*los campos del objeto proveedor cogen el valor de los campos que se envian desde el objeto
     creado en en el formulario */
     this.proveedor.nombre = this.formpro.value.nombre;
     this.proveedor.cif = this.formpro.value.cif;
     this.proveedor.direccion = this.formpro.value.direccion;
     this.proveedor.cp = this.formpro.value.cp;
     this.proveedor.localidad = this.formpro.value.localidad;
     this.proveedor.provincia = this.formpro.value.provincia;
     this.proveedor.telefono = this.formpro.value.telefono;
     this.proveedor.email = this.formpro.value.email;
     this.proveedor.contacto = this.formpro.value.contacto;

    /*Una vez que hemos informado el objeto proveedor, le decimos al formulario que se resetee.*/
     this.formpro.reset();
  }
}
