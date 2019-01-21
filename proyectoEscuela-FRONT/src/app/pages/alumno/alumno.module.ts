import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginGuard } from 'src/app/guards/login.guard';
import { UnloginGuard } from 'src/app/guards/unlogin.guard';
import { AppComponent } from 'src/app/app.component';
import { ALUMNO_ROUTES } from './alumno.routes';
import { AvisosComponent } from './avisos/avisos.component';
import { MateriasComponent } from './materias/materias.component';
import { PanelComponent } from './panel/panel.component';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
  declarations: [
    AvisosComponent,
    MateriasComponent,
    PanelComponent        
  ],
  imports: [
      BrowserModule,
      ALUMNO_ROUTES,
      SharedModule
      
  ],
  exports:[
    AvisosComponent,
    MateriasComponent,
    PanelComponent
    

  ],
  providers: [LoginGuard,UnloginGuard],
  bootstrap: [AppComponent]
})
export class AlumnoModule { }
