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



@NgModule({
  declarations: [
    AltausuarioComponent,
    EnviarnotificacionComponent,
    ListadoaniosComponent,
    ListadomateriasComponent,
    NotasComponent,
    PaneladminComponent    
  ],
  imports: [
      BrowserModule,
      ADMIN_ROUTES,
      SharedModule
      // shared
    
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
