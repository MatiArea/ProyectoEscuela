import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-boletin',
  templateUrl: './boletin.component.html',
  styleUrls: ['./boletin.component.css']
})
export class BoletinComponent implements OnInit {

  anios:any;
  alumnos:any;
  divisiones:any;
  
  constructor( private http: HttpClient ) { }

  ngOnInit() {

    this.http.get(`http://localhost:4000/colegio/anios/divisiones`)
    .subscribe( data=> {
    this.anios=data;
    this.divisiones=this.anios.divisiones;
    console.log(this.anios);
    console.log(this.divisiones);
   } );
 


  }


  cargaralumnos(a:any){

  
    this.http.get(`http://localhost:4000/colegio/:anio/:division`)
   .subscribe( data=> {
   this.alumnos=data;
   console.log(this.alumnos);
  } );    
  

  }

}
