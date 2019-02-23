import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../../models/url';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.css']
})
export class EvaluacionesComponent implements OnInit {

  constructor( private http: HttpClient ) { }

  url=Url;
  mostrar1=false;
  mostrar2=true;
  legajo:any;
  materias:any;
  evaluaciones:any;
  nota:any;


  ngOnInit() {

    this.legajo=localStorage.getItem( 'legajo' );
    return this.http.get(`${this.url}/colegio/alumno/materias/${this.legajo}`)
  .subscribe( data=> {
  this.materias=data;
 } );

  }
  /////////////////////////////////////////////////////////

  cambiar1(){
    this.mostrar1 = !this.mostrar1 ;
    this.mostrar2 = !this.mostrar2 ;
  }



 

  cargarnotas(e:any){
    this.http.get(`${this.url}/evaluacion/todas/alumno/${this.legajo}/${e.materia.nombre}`)
    .subscribe( data=> {
    this.nota=data;
    });
  }

}
