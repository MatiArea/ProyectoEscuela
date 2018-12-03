import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BarrainferiorComponent } from './barrainferior/barrainferior.component';
import { AppComponent } from '../app.component';

@NgModule({
  declarations: [
    BarrainferiorComponent
  ],
  imports: [
    BrowserModule
        
 ],
  exports:[
    BarrainferiorComponent
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class SharedModule { }
