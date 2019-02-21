import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.component.html',
  styleUrls: ['./evaluaciones.component.css']
})
export class EvaluacionesComponent implements OnInit {

  constructor( private http: HttpClient ) { }

  mostrar1=false;
  mostrar2=true;
  legajo:any;
  materias:any;
  evaluaciones:any;
  nota:any;


  ngOnInit() {

    this.legajo=localStorage.getItem( 'legajo' );
    return this.http.get(`http://localhost:4000/colegio/alumno/materias/${this.legajo}`)
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
    this.http.get(`http://localhost:4000/evaluacion/todas/alumno/${this.legajo}/${e.materia.nombre}`)
    .subscribe( data=> {
    this.nota=data;
    });
  }

}
