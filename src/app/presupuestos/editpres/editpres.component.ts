import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../servicios/presupuestos.service';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; /* En metodos HTTP el id esta incluido en las rutas de navegacion */

@Component({
  selector: 'app-editpres',
  templateUrl: './editpres.component.html',
  styleUrls: ['./editpres.component.css']
})

export class EditpresComponent implements OnInit {

  presupuestoForm: FormGroup;
  presupuesto: any;
  base: any;
  tipo: any;
  iva: any = 0;
  total: any = 0;

  id: string;

  /**
   * Para conseguir el id que se nos envia por la ruta de navegacion.
   * import { Router, ActivatedRoute } from '@angular/router';
   * Con el codigo que hay en el constructor estamos consiguiendo que se vuelque
   * el registro concreto en la vble presupuesto que enviamos a la plantilla.
   */
  constructor(private pf: FormBuilder,
              private presupuestoService: PresupuestosService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {
    this.activatedRouter.params
        .subscribe( parametros => {
              this.id = parametros['id']; /*cogemos el id que viene dentro de los parametros de la URL*/
              this.presupuestoService.getPresupuestos(this.id) /* Vamos al servicio para que nos devuelva el objeto prsupuesto
                                                                  que queremos con ese ID*/
                        .subscribe (         /*Se reupera los datos delpresupuesto con ese ID y se guarda en la vble. this.presupuesto
                                              Como en la vista en cada campo tien su ngModel, se cargan inmediatamente los datos que se
                                              recuperan. */
                             presupuesto =>
                               this.presupuesto = presupuesto
                        );
        });
  }

  /**
   * Al iniciarse el componente se ejecuta este metodo e inicializa lso campos de pantalla
   */
  ngOnInit() {

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

  cambioValores() {
    this.presupuestoForm.valueChanges.subscribe(valor => { /*valuechanges -> lanza un evento cada vez que formControl cambia.
                                                            Nos subscribimos a cada cambio que se realiza en los campos del form
                                                            y se realizan los calculos*/
      this.base = valor.base;
      this.tipo = valor.tipo;
      this.presupuestoForm.value.iva = this.base * this.tipo;
      this.presupuestoForm.value.total = this.base +
                                         this.presupuestoForm.value.iva;
    });
  }

  envioDatos() {
    /* Guarda en el objeto presupuesto los valores que haya en el formulario. En el formlario tenemos databinding two way, cuyos datos
        son recogidos por esta funcion y son enviados a al BD  */
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
    this.presupuestoService.putPresupuesto(this.presupuesto, this.id)
         .subscribe(newPres => {
            this.router.navigate(['/presupuesto']); /*Metodo para redirigir*/
         });
    this.presupuestoForm.reset();
  }
}
