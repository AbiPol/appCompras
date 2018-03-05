import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; /*libreria de gestion del routing de angular*/
import { FormsModule, ReactiveFormsModule} from '@angular/forms'; /*libreria para gestionar los forms*/
import { HttpModule } from '@angular/http'; /*dependencias para utilizar las peticiones HTTP*/


import { AppComponent } from './app.component';
import { ProveedoresService} from './servicios/proveedores.service';
import { ProveedoresComponent } from './proveedores/proveedores/proveedores.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { AddprovveeComponent } from './proveedores/addprovvee/addprovvee.component';
import { AddpresComponent } from './presupuestos/addpres/addpres.component';
import { PresupuestosService } from './servicios/presupuestos.service';
import { PresupuestoComponent } from './presupuestos/presupuesto/presupuesto.component';
import { EditpresComponent } from './presupuestos/editpres/editpres.component';
import { RegistroComponent } from './autenticacion/registro/registro.component';
import { AutenticacionService } from './servicios/autenticacion.service';
import { InisesComponent } from './autenticacion/inises/inises.component';
import { GuardService } from './servicios/guard.service';


const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'proveedores', component: ProveedoresComponent,
    canActivate: [GuardService]}, /* Sirve para proteger la ruta*/
  {path: 'addprovee', component: AddprovveeComponent,
  canActivate: [GuardService]},
  {path: 'addpres', component: AddpresComponent,
    canActivate: [GuardService]},
  {path: 'presupuesto', component: PresupuestoComponent,
    canActivate: [GuardService]},
  {path: 'registro', component: RegistroComponent},
  {path: 'inises', component: InisesComponent},
  {path: 'editpres/:id', component: EditpresComponent,
    canActivate: [GuardService]}, /** forzamos a que a esa ruta se le agregue ese id
                                                            para realizar la busqueda en la BD por ese ID*/
  {path: '**', component: InicioComponent} /*cualquier ruta que no exista se redirige a la pagina de inicio*/
];

@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    InicioComponent,
    HeaderComponent,
    AddprovveeComponent,
    AddpresComponent,
    PresupuestoComponent,
    EditpresComponent,
    RegistroComponent,
    InisesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    /*Estamos creando un array de rutas que emplea nuesta aplicacion para cargar componentes en la pagina*/
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ProveedoresService,
              PresupuestosService,
              AutenticacionService,
              GuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
