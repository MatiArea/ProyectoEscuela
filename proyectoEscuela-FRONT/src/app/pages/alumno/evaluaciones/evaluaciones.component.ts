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
 
  legajo:any;
  materias:any;
  evaluaciones:any;
  nota:any;
  bandera:boolean;
  mostrar1:boolean;
  mostrar2:boolean;

  ngOnInit() {
    this.mostrar1=false;
    this.mostrar2=false;
    this.retornarmaterias();

  }
  /////////////////////////////////////////////////////////
  cambiar1(){
    this.mostrar1 = !this.mostrar1;
    this.mostrar2 = !this.mostrar2;
  }

 
  

  retornarmaterias(){
    this.bandera=true;
    this.legajo=localStorage.getItem( 'legajo' );
    return this.http.get(`${this.url}/colegio/alumno/materias/${this.legajo}`)
  .subscribe( data=> {
    this.materias=data;
    this.bandera=false;
    this.mostrar1 = !this.mostrar1;
 } );
  }
 

  cargarnotas(e:any){
    this.mostrar1 = !this.mostrar1;
    this.bandera=true;
    this.http.get(`${this.url}/evaluacion/todas/alumno/${this.legajo}/${e.materia.nombre}`)
    .subscribe( data=> {
    this.nota=data;
    this.bandera=false;
    this.mostrar2=!this.mostrar2;
    });
  }

  
}
