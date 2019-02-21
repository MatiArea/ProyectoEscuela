import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginGuard } from 'src/app/guards/login.guard';
import { UnloginGuard } from 'src/app/guards/unlogin.guard';
import { AppComponent } from 'src/app/app.component';
import { EnviarnotificacionComponent } from './enviarnotificacion/enviarnotificacion.component';
import { ListadomateriasComponent } from './listadomaterias/listadomaterias.component';
import { PaneladminComponent } from './paneladmin/paneladmin.component';
import { ADMIN_ROUTES } from './admin.routes';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearevaluacionComponent } from './crearevaluacion/crearevaluacion.component';
import { FormsModule } from '@angular/forms';
import { ListadomatevaComponent } from './listadomateva/listadomateva.component';
import { BoletinComponent } from './boletin/boletin.component';
import { MostrarboletinesComponent } from './mostrarboletines/mostrarboletines.component';



@NgModule({
  declarations: [
    EnviarnotificacionComponent,    
    ListadomateriasComponent,
    PaneladminComponent,
    CrearevaluacionComponent,    
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
    EnviarnotificacionComponent,    
    ListadomateriasComponent,    
    PaneladminComponent

  ],
  providers: [LoginGuard,UnloginGuard],
  bootstrap: [AppComponent]
})
export class AdminModule { }
