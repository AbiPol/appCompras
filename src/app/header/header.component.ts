import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private autenticacionService: AutenticacionService,
               private router: Router,
               private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  userConectado() {
    return this.autenticacionService.usuarioConectado();
  }

  onLogout() {
     this.autenticacionService.logout();
     this.router.navigate(['/inicio']);
  }

}
