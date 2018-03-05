import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * Cuando arranque la aplicacion lo primero que hace es conectarse a la BD con este dominio.
 */
export class AppComponent implements OnInit {

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyCxMfOqilwAHQNKdppMy9KnAeutGjlpiwU",
      authDomain: "comprasapp-de898.firebaseapp.com"
    });
  }
}
