import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-listadomaterias',
  templateUrl: './listadomaterias.component.html',
  styleUrls: ['./listadomaterias.component.css']
})
export class ListadomateriasComponent implements OnInit {

  constructor( private http: HttpClient ) { }

  mostrar1=false;
  mostrar2=true;
  mostrar3=true;
  legajo:any;
  materias:any;
  evaluaciones:any;
  evaluacion:any;
  notas:any;

  ngOnInit() {

    this.legajo=localStorage.getItem( 'legajo' );



    this.http.get(`http://localhost:4000/colegio/profesor/materias/${this.legajo}`)
    .subscribe( data=> {
    this.materias=data;
    });
    

  }
///////////////////////////////////////////////////////////////////

  cambiar1(){
    this.mostrar2 = !this.mostrar2 ;
    this.mostrar1 = !this.mostrar1 ; 
  }

  cambiar2(){
    this.mostrar2 = !this.mostrar2 ;
    this.mostrar3 = !this.mostrar3 ;   
  }

  volver1(){
    this.mostrar2 = !this.mostrar2 ;
    this.mostrar3 = !this.mostrar3 ;   
  }

  cargarevaluaciones(m:any){
    this.http.get(`http://localhost:4000/evaluacion/todas/cargadas/${m.materia.nombre}/${this.legajo}/${m.materia.anio.numero}/${m.division.nombre}`)
    .subscribe( data=> {
    this.evaluaciones=data;
    });

  }

  cargarnotas(m:any){
    this.http.get(`http://localhost:4000/evaluacion/display/${m.folio}`)
    .subscribe( data=> {
    this.evaluacion=data;
    this.notas=this.evaluacion.notas;
    
    
    });
  }

}
