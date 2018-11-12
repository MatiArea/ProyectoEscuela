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

 

  login( form: NgForm) {
    console.log( form.value );

    if (  form.value.email === 'ivan'  &&  form.value.password === 'ivan'  ) {
      localStorage.setItem( 'email', form.value.email );
      this.rotuer.navigate(['/paneladmin']);
      
    }
  }

}
