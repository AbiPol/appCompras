import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AutenticacionService } from './autenticacion.service';

@Injectable()
export class GuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.autenticacionService.usuarioConectado();
    throw new Error("Method not implemented.");
  }
  /**
   * Nos devuleve si el usuario esta conectado
   */
  constructor(private autenticacionService: AutenticacionService) { }

}
