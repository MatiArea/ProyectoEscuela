import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// rutas

import { APP_ROUTING } from './app.routes';

//

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

import { LoginGuard } from '../app/guards/login.guard';
import { UnloginGuard } from '../app/guards/unlogin.guard';
import { AdminModule } from './pages/admin/admin.module';
import { AlumnoModule } from './pages/alumno/alumno.module';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,    
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    APP_ROUTING,
    HttpClientModule,
    AdminModule,
    AlumnoModule,
    SharedModule

  ],
  providers: [LoginGuard,UnloginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
