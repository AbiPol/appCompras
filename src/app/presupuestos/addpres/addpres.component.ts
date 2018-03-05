/**
 * TECNICA REACTIVE DE GESTION DE FORMULARIOS
 * Los datos no vienen a través de las directivas ngModel y ngForm
 */
import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../servicios/presupuestos.service';
/**
 * Para esta tecnica debemos de importar las siguientes clases
 */
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
/**
 * Un FormControl es una directiva que se utiliza para crear una instancia de FormControl que puede
 * utilizar para hacer un seguimiento de estado de un elemento de forma particular y su estado
 * de validación.
 * https://code.tutsplus.com/es/tutorials/introduction-to-forms-in-angular-4-reactive-forms--cms-29787
 * Cada cmpo del formulario lleva la directiva
 *  formControlName="nombre del campo", que es quien va aunir la plantilla a la vista
 *
 * FormGroup agrupa todos los FormControls individuales del formulario creado.
 */
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addpres',
  templateUrl: './addpres.component.html',
  styleUrls: ['./addpres.component.css']
})
export class AddpresComponent implements OnInit {

  /**
   * Objeto donde vamos a almacenar los valores de los campos del formulario.Es un objeto con
   * los campos del formulario
   * Este campo es el que va unir el formulario con este componente para realizar la logica.
   * En la plantilla va este codigo:
   *       [formGroup] = "presupuestoForm", dentro de la etiqueta <form>.
   * C
   */
  presupuestoForm: FormGroup;
  /**
   * Objeto donde almacenamos los valores que obtenemos de cada nuevo presupuesto.
   * Es un bojeto json.
   */
  presupuesto: any;
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;


  constructor(private pf: FormBuilder,
              private presupuestoService: PresupuestosService,
              private router: Router,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    /**
     * pfBuilder una forma de declarar un formgroup
     * pf.group almacena los diferentes campos del formulario y aqui se pueden inicializar y a la vez
     * darles validaciones.Para esto ultimo se debe de importar la clase validators.
     * Por ejemplo:
     *   email: ['',[Validators.required,
                        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
     * email seria un formcontrol
     */
    this.presupuestoForm = this.pf.group({
      proveedor: ['', Validators.required ],
      fecha: ['', Validators.required ],
      concepto: ['', Validators.required ],
      base: ['', [Validators.required,
                  Validators.minLength(10)] ],
      tipo: ['', Validators.required ],
      iva: this.iva,
      total: this.total
    });

    /*funcion que detecta el cambio en real de los campos base e iva y realiza calculos*/
    this.cambioValores();
  }

  envioDatos() {
    this.presupuesto = {
      proveedor: this.presupuestoForm.get('proveedor').value,
      fecha: this.presupuestoForm.get('fecha').value,
      concepto: this.presupuestoForm.get('concepto').value,
      base: this.presupuestoForm.get('base').value,
      tipo: this.presupuestoForm.get('tipo').value,
      iva: this.presupuestoForm.get('iva').value,
      total: this.presupuestoForm.get('total').value
    };

    /*En peticiones POST hay que realizar el subscribe*/
    this.presupuestoService.postPresupuesto(this.presupuesto)
         .subscribe(newPres => {
            this.router.navigate(['/presupuesto']);
         });
    this.presupuestoForm.reset();
  }

  cambioValores() {
    /**
     *nos suscribimos a los cambios del parametro presupuestoForm, en el parametro valor
     se guardan en tiempo real los valores del formulario
     en el componente html hay que establecer un ngModel para que se actualicen en
     tiempo real los valores
     */
    this.presupuestoForm.valueChanges.subscribe(valor => {
      this.base = valor.base;
      this.tipo = valor.tipo;
      this.presupuestoForm.value.iva = this.base * this.tipo;
      this.presupuestoForm.value.total = this.base +
                                         this.presupuestoForm.value.iva;
    });
  }
}
