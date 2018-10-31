import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//rutas

import { APP_ROUTING } from './app.routes';

//

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PaneladminComponent } from './components/paneladmin/paneladmin.component';
import { AltausuarioComponent } from './components/usuario/altausuario/altausuario.component';
import { BarrainferiorComponent } from './components/barrainferior/barrainferior.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaneladminComponent,
    AltausuarioComponent,
    BarrainferiorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
