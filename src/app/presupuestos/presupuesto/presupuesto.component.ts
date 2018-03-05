import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../servicios/presupuestos.service';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {

  /* definimos un array para ir recogiendo los datos que nos llegan desde el get del servicio*/
  presupuestos: any [] = [];

  /* en el constructor inicializamos el servicio para poder utilizarlo en el componente */
  constructor(private presupuestosService: PresupuestosService) {
    this.presupuestosService.getPresupuesto()
         .subscribe(  /*Dentro se subscribe recibimos presupuesto como respuesta del servidor, y lo pasamos al siguiente codigo */
           presupuestos => {
              // tslint:disable-next-line:forin
              for (const id$ in presupuestos ) {
                const p = presupuestos[id$];
                p.id$ = id$;
                this.presupuestos.push(presupuestos[id$]);
              }
           }
          );  /* Nos suscribimos a este. Lo que hace es ejecutar al inicio de este componente
                           este servicio para traernos los datos que el servicio pasa a formato JSON */
  }

  ngOnInit() {
  }

  /**
   * Metodo declarado para eliminar el registro seleccionado del form
   */
  eliminarPres(id$) {
    this.presupuestosService.delPresupuesto(id$)
           .subscribe( res => {
                this.presupuestos = []; /* vaciamos el array de presupuestos, ya que sigue con toda la informacion
                                           y al eliminar un registro del formulario, se elimina de la BD y no del array.
                                           Por esto priemro vaciamos el array y luego lo cargamos de nuevo.*/
                this.presupuestosService.getPresupuesto()
                        .subscribe(  /*Dentro se subscribe recibimos presupuesto como respuesta del servidor,
                                       y lo pasamos al siguiente codigo */
                          presupuestos => {
                            for (const id$ in presupuestos) {
                              const p = presupuestos[id$];
                              p.id$ = id$;
                              this.presupuestos.push(presupuestos[id$]);
                            }
                          });
           });
  }

}
