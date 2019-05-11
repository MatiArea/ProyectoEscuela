import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginGuard } from 'src/app/guards/login.guard';
import { UnloginGuard } from 'src/app/guards/unlogin.guard';
import { AppComponent } from 'src/app/app.component';
import { ALUMNO_ROUTES } from './alumno.routes';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { BoletinComponent } from './boletin/boletin.component';
import { PanelComponent } from './panel/panel.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { EvaluacionesComponent } from './evaluaciones/evaluaciones.component';
import { MateriasComponent } from './materias/materias.component';




@NgModule({
  declarations: [
    NotificacionesComponent,
    BoletinComponent,
    PanelComponent,
    NotificacionComponent,
    EvaluacionesComponent,
    MateriasComponent        
  ],
  imports: [
      BrowserModule,
      ALUMNO_ROUTES,
      SharedModule
      
  ],
  exports:[
    NotificacionesComponent,
    BoletinComponent,
    PanelComponent
    

  ],
  providers: [LoginGuard,UnloginGuard],
  bootstrap: [AppComponent]
})
export class AlumnoModule { }
