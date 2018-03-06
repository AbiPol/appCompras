import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AutenticacionService } from './autenticacion.service';

@Injectable()
export class GuardService implements CanActivate {

  constructor(private autenticacionService: AutenticacionService) { }

  /**
   *Metodo que nos dice si una ruta se puede activar o no. Se puede activar si el usuario esta conectado
   * y no se puede si el usuario no lo esta.
   * @param route
   * @param state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.autenticacionService.usuarioConectado();
  }

}
