import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginGuard } from 'src/app/guards/login.guard';
import { UnloginGuard } from 'src/app/guards/unlogin.guard';
import { AppComponent } from 'src/app/app.component';
import { EnviarnotificacionComponent } from './enviarnotificacion/enviarnotificacion.component';
import { ListadoEvaluacionesComponent } from './listadoevaluaciones/listadoevaluaciones.component';
import { PaneladminComponent } from './paneladmin/paneladmin.component';
import { ADMIN_ROUTES } from './admin.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearevaluacionComponent } from './crearevaluacion/crearevaluacion.component';
import { FormsModule } from '@angular/forms';
import { CargarEvaluacionComponent } from './cargarevaluacion/cargarevaluacion.component';
import { CargarBoletinComponent } from './cargarboletin/cargarboletin.component';
import { MostrarboletinesComponent } from './mostrarboletines/mostrarboletines.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { ProfesoresComponent } from './profesores/profesores.component';



@NgModule({
  declarations: [
    EnviarnotificacionComponent,    
    ListadoEvaluacionesComponent,
    PaneladminComponent,
    CrearevaluacionComponent,          
    CargarEvaluacionComponent,
    CargarBoletinComponent,
    MostrarboletinesComponent,
    AlumnosComponent,
    ProfesoresComponent    
  ],
  imports: [
      BrowserModule,
      ADMIN_ROUTES,
      SharedModule,
      FormsModule
    
  ],
  exports:[
    EnviarnotificacionComponent,    
    ListadoEvaluacionesComponent,    
    PaneladminComponent

  ],
  providers: [LoginGuard,UnloginGuard],
  bootstrap: [AppComponent]
})
export class AdminModule { }
