import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private rotuer:Router, private http: HttpClient  ) { }

  mostrarerror=false;
 
  postlogin(form: NgForm) {
  
    this.http.post('http://localhost:4000/login',
    {
      user: form.value.email,
      pass:form.value.password
    }).subscribe(
      (data:any)=> {
        console.log(data);
    
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

/*  login( form: NgForm) {
    console.log( form.value );

    if ( form.value.email === 'ivan'  &&  form.value.password === 'ivan') {
      localStorage.setItem( 'email', form.value.email );
      localStorage.setItem( 'rol', 'Preceptor' );
      this.rotuer.navigate(['/paneladmin/inicio']);
      this.mostrarerror=false;
      
    } else {
      this.mostrarerror=true;
    }

    if ( form.value.email === 'matias'  &&  form.value.password === 'matias') {
      localStorage.setItem( 'email', form.value.email );
      localStorage.setItem( 'rol', 'Alumno' );
      this.rotuer.navigate(['/panel/inicio']);
      this.mostrarerror=false;
      
    } else {
      this.mostrarerror=true;
    }

    if ( form.value.email === 'martin'  &&  form.value.password === 'martin') {
      localStorage.setItem( 'email', form.value.email );
      localStorage.setItem( 'rol', 'Profesor' );
      this.rotuer.navigate(['/paneladmin/inicio']);
      this.mostrarerror=false;
      
    } else {
      this.mostrarerror=true;
    }
  }
*/
 

  
}
