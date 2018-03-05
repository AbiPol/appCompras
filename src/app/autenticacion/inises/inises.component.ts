import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { AutenticacionService } from '../../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inises',
  templateUrl: './inises.component.html',
  styleUrls: ['./inises.component.css']
})
export class InisesComponent implements OnInit {

  loginForm: FormGroup;
  userData: any;

  mensaje = false;

  constructor(private rf: FormBuilder,
              private autenticacionService: AutenticacionService,
              private router: Router,
              private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loginForm = this.rf.group({
      email: ['', [ Validators.required,
                    Validators.email]],
      password: ['', [Validators.required,
                      Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
                      Validators.minLength(6)]]
    });
  }

  /**
  *Metodo para realizar el envio de los datos
  */
  envioDatos() {
    this.userData = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    /*Enviamos los datos del usuario para autenticar*/
    this.autenticacionService.inicioSesion(this.userData);

    /**
     * Con esta funcion le damos 2 segundos para esperar la respuesta del servidor.
     */
    setTimeout(() => {
      if (!this.isAutenticado()) {
          this.mensaje = true;
      }
    }, 2000);
  }

  isAutenticado() {
      return this.autenticacionService.usuarioConectado();

  }
}
