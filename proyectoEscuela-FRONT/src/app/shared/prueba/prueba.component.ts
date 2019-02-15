import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  prueba:any;
  date=new Date();

  constructor( private http: HttpClient ) { }

  ngOnInit() {
    console.log(this.date);

      return this.http.get('http://localhost:4000/colegio/alumno/materias/5275920')
      .subscribe( data=> { this.prueba=data; });
    
  }

  getdata() {
     return this.http.get('http://localhost:4000/colegio/alumno/materias/5275920')
   .subscribe( data=> {
   console.log(data);
  } );
 }


}


// getdata() {
  // return this.http.get('http://localhost:4000/colegio/anios')
  // .subscribe( data=> {
   // console.log(data);
  // } );
// }
