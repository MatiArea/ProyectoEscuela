import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BarrainferiorComponent } from './barrainferior/barrainferior.component';
import { AppComponent } from '../app.component';
import { ErrorComponent } from './error/error.component';
import { SHARED_ROUTES } from './shared.routes';
import { InicioComponent } from './inicio/inicio.component';
import { PruebaComponent } from './prueba/prueba.component';



@NgModule({
  declarations: [
    BarrainferiorComponent,
    ErrorComponent,
    InicioComponent,
    PruebaComponent
  ],
  imports: [
    BrowserModule,
    SHARED_ROUTES
        
 ],
  exports:[
    BarrainferiorComponent,
    InicioComponent
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class SharedModule { }
