import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//rutas

import { APP_ROUTING } from './app.routes';

//

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PaneladminComponent } from './components/paneladmin/paneladmin.component';
import { AltausuarioComponent } from './components/usuario/altausuario/altausuario.component';
import { BarrainferiorComponent } from './components/barrainferior/barrainferior.component';
import { PruebaComponent } from './components/prueba/prueba.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PaneladminComponent,
    AltausuarioComponent,
    BarrainferiorComponent,
    PruebaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    APP_ROUTING,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
