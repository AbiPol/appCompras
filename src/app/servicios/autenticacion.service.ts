import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Router, ActivatedRoute} from '@angular/router';

@Injectable()
export class AutenticacionService {

  constructor( private router: Router,
               private activatedRoute: ActivatedRoute) { }

  /**
   * Con este metodo enviamos a firebase los datos de usuario
   */
  registroUsuario(userData) {
    firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
               .catch(
                 error => {
                   console.log(error);
                 });
  }

  inicioSesion(userdata) {
    firebase.auth().signInWithEmailAndPassword(userdata.email, userdata.password)
              .then( response => {
                console.log(response);
                this.router.navigate(['/inicio']);
              })
              .catch( error => {
                console.log(error);
              });
  }

  /**
   * Nos indica si un usuario esta conectado a la sesion.
   * Devuelte 'true' si esta conectado y 'false' si no lo esta.
   */
  usuarioConectado() {
    const usuarioConectado = firebase.auth().currentUser;
    if (usuarioConectado) {
      return true;
      } else {
      return false;
      }
  }
/*Metodo que nos desconecta de la BD*/
  logout() {
    firebase.auth().signOut();
  }
}
