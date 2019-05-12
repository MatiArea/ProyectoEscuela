import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// rutas

import { APP_ROUTING } from './app.routes';

// servicios
import {BoletinService} from './services/boletin/boletin.service';
import { ColegioService } from './services/colegio/colegio.service';
import { NotificacionService } from './services/notificacion/notificacion.service';
import { EvaluacionService } from './services/evaluacion/evaluacion.service';
//

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

import { LoginGuard } from '../app/guards/login.guard';
import { UnloginGuard } from '../app/guards/unlogin.guard';
import { AdminModule } from './pages/admin/admin.module';
import { AlumnoModule } from './pages/alumno/alumno.module';
import { SharedModule } from './shared/shared.module';
import { PruebaComponent } from './pages/prueba/prueba.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PruebaComponent,
    
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    APP_ROUTING,
    HttpClientModule,
    AdminModule,
    AlumnoModule,
    SharedModule

  ],
  providers: [LoginGuard,UnloginGuard,BoletinService,ColegioService,NotificacionService,EvaluacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
