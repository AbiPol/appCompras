/**
 * Peticion POST para escribir o enviar datos a la BD externa o cliente externo.
 */
import { Injectable } from '@angular/core';
/*Importamos esta librerias para trabajar con petiones POST*/
import { Headers, Http, Response} from '@angular/http';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx'; /*Libreria de servicio */

@Injectable()
export class PresupuestosService {

  /*URL a nuestra BD. Crea una entidad presupuestos.json que el formato de objetos de JS*/
  presURL = 'https://comprasapp-de898.firebaseio.com/presupuestos.json';

  preURL = 'https://comprasapp-de898.firebaseio.com/presupuestos';

  constructor(private http: Http) { }

  postPresupuesto(presupuesto: any) {

    const newPres = JSON.stringify(presupuesto); /* Convierte en una caden JSON el
                                                   parametro presupuesto, ya que asi lo necesita el metodo POST*/
    const headers = new Headers({
      'ContentType': 'application/json'
    });

    /* devuelve objeto para insertar en la coleccion de la BD. Enviamos la URL, el body o contenido del mensaje y los headers */
    return this.http.post(this.presURL, newPres, {headers}) /*Con .map decimos que lo que se reciba en la respuesta del servidor
                                                             lo imprimimos en la consola y ademas se devuelve el resultado en formato json*/
      .map( res => {
          console.log(res.json());
          return res.json();
      });
  }

  /* Obtenemos informacion del servidor de todos los presupuestos que hay en la BD*/
  getPresupuesto() {

    return this.http.get(this.presURL)
       .map(
         res => res.json()
       );
  }

  /**
   * Metodo para realizar lectura de un item de la coleccion
   */
  getPresupuestos(id$: string) {
    /* es una URL que contiene la URL que lleva a la coleccion de presupuestos + el ID del elemento a modificar. json
       Se puede probar poniendo la URL resultante en el navegador y nos mostrara los datos del id en formato Json.*/
    const url = `${this.preURL}/${id$}.json`;

    /* pedimos al servidor ese elemento de la url.*/
    return this.http.get(url)
          .map( /*transformamos la respuesta del servidor en formato json*/
            res => res.json()
          );
  }

  putPresupuesto(presupuesto: any, id$: string) {
    const newPre = JSON.stringify(presupuesto); /* Convierte en una caden JSON el
                                                   parametro presupuesto, ya que asi lo necesita el metodo POST*/
    const headers = new Headers({
      'ContentType': 'application/json'
    });
    const url = `${this.preURL}/${id$}.json`;

    return this.http.put(url, newPre, {headers})
           .map( res => {
                console.log(res.json());
                return res.json();
           });
  }

  /**
   * Metodo que usamos para el borrado de un presupuesto.
   */
  delPresupuesto (id$: string) {
    const url = `${this.preURL}/${id$}.json`;

    return this.http.delete(url)
           .map( res => res.json());
  }
}
