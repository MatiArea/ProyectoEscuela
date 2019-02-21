import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginGuard } from 'src/app/guards/login.guard';
import { UnloginGuard } from 'src/app/guards/unlogin.guard';
import { AppComponent } from 'src/app/app.component';
import { AltausuarioComponent } from './altausuario/altausuario.component';
import { EnviarnotificacionComponent } from './enviarnotificacion/enviarnotificacion.component';
import { ListadoaniosComponent } from './listadoanios/listadoanios.component';
import { ListadomateriasComponent } from './listadomaterias/listadomaterias.component';
import { NotasComponent } from './notas/notas.component';
import { PaneladminComponent } from './paneladmin/paneladmin.component';
import { ADMIN_ROUTES } from './admin.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearevaluacionComponent } from './crearevaluacion/crearevaluacion.component';
import { NotaComponent } from './nota/nota.component';
import { CargarevaluacionComponent } from './cargarevaluacion/cargarevaluacion.component';
import { CargadenotasComponent } from './cargadenotas/cargadenotas.component';
import { ListadodivComponent } from './listadodiv/listadodiv.component';
import { ListadoalumnosComponent } from './listadoalumnos/listadoalumnos.component';
import { MateriasalumnoComponent } from './materiasalumno/materiasalumno.component';
import { FormsModule } from '@angular/forms';
import { ListadomatevaComponent } from './listadomateva/listadomateva.component';
import { BoletinComponent } from './boletin/boletin.component';
import { MostrarboletinesComponent } from './mostrarboletines/mostrarboletines.component';



@NgModule({
  declarations: [
    AltausuarioComponent,
    EnviarnotificacionComponent,
    ListadoaniosComponent,
    ListadomateriasComponent,
    NotasComponent,
    PaneladminComponent,
    CrearevaluacionComponent,
    NotaComponent,
    CargarevaluacionComponent,
    CargadenotasComponent,
    ListadodivComponent,
    ListadoalumnosComponent,
    MateriasalumnoComponent,
    ListadomatevaComponent,
    BoletinComponent,
    MostrarboletinesComponent    
  ],
  imports: [
      BrowserModule,
      ADMIN_ROUTES,
      SharedModule,
      FormsModule
    
  ],
  exports:[
    AltausuarioComponent,
    EnviarnotificacionComponent,
    ListadoaniosComponent,
    ListadomateriasComponent,
    NotasComponent,
    PaneladminComponent

  ],
  providers: [LoginGuard,UnloginGuard],
  bootstrap: [AppComponent]
})
export class AdminModule { }
