import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private rotuer:Router ) { }

  mostrarerror=false;

  login( form: NgForm) {
    console.log( form.value );

    if ( form.value.email === 'ivan'  &&  form.value.password === 'ivan') {
      localStorage.setItem( 'email', form.value.email );
      localStorage.setItem( 'rol', 'Preceptor' );
      this.rotuer.navigate(['/paneladmin']);
      this.mostrarerror=false;
      
    } else {
      this.mostrarerror=true;
    }

    if ( form.value.email === 'matias'  &&  form.value.password === 'matias') {
      localStorage.setItem( 'email', form.value.email );
      localStorage.setItem( 'rol', 'Alumno' );
      this.rotuer.navigate(['/panel']);
      this.mostrarerror=false;
      
    } else {
      this.mostrarerror=true;
    }
  }

}
