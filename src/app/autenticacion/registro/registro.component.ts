import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AutenticacionService } from '../../servicios/autenticacion.service';
/* Para importanos el servicio de enrutamiento*/
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  /* Declaramos el formGroup que nos une la vista con la logica de este archivo*/
  registroForm: FormGroup;
  /*Objeto para almacenar email y password de cada usuario*/
  userData: any;

/****************************
 * Validaciones de los campos del form
*****************************/
  erroresForm = {
    'email': '',
    'password': ''
   };

   mensajesValidacion = {
    'email': {
      'required': 'Email obligatorio',
      'email': 'Introduzca una dirección email correcta'
    },
    'password': {
      'required': 'Contraseña obligatoria',
      'pattern': 'La contraseña debe tener al menos una letra un número ',
      'minlength': 'y más de 6 caracteres'
    }
  };

  constructor(private rf: FormBuilder,
              private autenticacionService: AutenticacionService,
              private router: Router,
              private activatedRouter: ActivatedRoute) {}

    onValueChanged(data?: any) {
      /*console.log('this.registroForm: ' + this.registroForm);*/
      if (!this.registroForm) { return; }
      const form = this.registroForm;
        // tslint:disable-next-line:forin
        for (const field in form.getRawValue()) {
        /*console.log('for del form ' + field);*/
        this.erroresForm[field] = '';
        const control = form.get(field);
        /*console.log(field);*/
        if (control && control.dirty && !control.valid) {
          const messages = this.mensajesValidacion[field];
          // tslint:disable-next-line:forin
          for (const key in control.errors) {
            this.erroresForm[field] += messages[key] + ' ';
            }
          }
        }
      }

  ngOnInit() {
    this.registroForm = this.rf.group({
      email: ['', [ Validators.required,
                    Validators.email]],
      password: ['', [Validators.required,
                      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                      Validators.minLength(6)]]
    });

    /* cadavez que haya cambios en el formulario se les pasamos a la funcion
    *  onValueCahnged y asi asociamos el error que nos da con el texto asociado
    */
    this.registroForm.valueChanges.subscribe(data => this.onValueChanged(data));
    /*Para vaciar la funcion que evalua los errores.*/
    this.onValueChanged();
  }

  /**
  *Metodo para realizar el envio de los datos
  */
  envioDatos() {
    this.userData = {
      email: this.registroForm.get('email').value,
      password: this.registroForm.get('password').value
    };
    /*Enviamos los datos del usuario*/
    this.autenticacionService.registroUsuario(this.userData);
    /*nos redirige al inicio una vez autenticado*/
    this.router.navigate(['/inicio']);
  }
}
