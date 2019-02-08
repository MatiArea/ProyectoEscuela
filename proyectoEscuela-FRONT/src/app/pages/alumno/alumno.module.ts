import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginGuard } from 'src/app/guards/login.guard';
import { UnloginGuard } from 'src/app/guards/unlogin.guard';
import { AppComponent } from 'src/app/app.component';
import { ALUMNO_ROUTES } from './alumno.routes';
import { AvisosComponent } from './avisos/avisos.component';
import { BoletinComponent } from './boletin/boletin.component';
import { PanelComponent } from './panel/panel.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AvisoComponent } from './aviso/aviso.component';
import { EvaluacionesComponent } from './evaluaciones/evaluaciones.component';
import { MateriasComponent } from './materias/materias.component';




@NgModule({
  declarations: [
    AvisosComponent,
    BoletinComponent,
    PanelComponent,
    AvisoComponent,
    EvaluacionesComponent,
    MateriasComponent        
  ],
  imports: [
      BrowserModule,
      ALUMNO_ROUTES,
      SharedModule
      
  ],
  exports:[
    AvisosComponent,
    BoletinComponent,
    PanelComponent
    

  ],
  providers: [LoginGuard,UnloginGuard],
  bootstrap: [AppComponent]
})
export class AlumnoModule { }
