import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../models/url';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private rotuer:Router, private http: HttpClient  ) { }

  mostrarerror=false;
  url=Url;
 
  postlogin(form: NgForm) {
    console.log(this.url);
  
    this.http.post(`${this.url}/login`,
    {
      user: form.value.email,
      pass:form.value.password
    }).subscribe(
      (data:any)=> {
    
        if ( data.status===200 ) {
          localStorage.setItem( 'email', data.nombre );
          localStorage.setItem( 'apellido', data.apellido );
          localStorage.setItem( 'rol', data.roll );
          localStorage.setItem( 'legajo', data.legajo );
          localStorage.setItem( 'dni', data.dni );

          if( data.roll==='Alumno' ) {this.rotuer.navigate(['/panel/inicio']);}        
          else if ( data.roll==='Profesor' ) {this.rotuer.navigate(['/paneladmin/inicio']);}      
          else if( data.roll==='Preceptor' ) {this.rotuer.navigate(['/paneladmin/inicio']);}
    

          this.mostrarerror=false;
        } else if ( data.status=500 ) {
          this.mostrarerror=true;
        } 
    
      }
    ); 
  
  }

  
}
