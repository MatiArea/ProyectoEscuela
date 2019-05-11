import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CanvasJS from 'canvasjs-2.3.1/canvasjs.min';
import { Url } from '../../../models/url';


@Component({
  selector: 'app-listadoevaluaciones',
  templateUrl: './listadoevaluaciones.component.html',
  styleUrls: ['./listadoevaluaciones.component.css']
})
export class ListadoEvaluacionesComponent implements OnInit {

  constructor( private http: HttpClient ) { }

  url=Url;
  mostrar1=false;
  mostrar2=false;
  mostrar3=false;
  legajo:any;
  materias:any;
  evaluaciones:any;
  evaluacion:any;
  notas:any;
  aprobados=0;
  desaprobados=0;
  nota10=0;
  bandera:boolean;



  ngOnInit() {

    

    this.legajo=localStorage.getItem( 'legajo' );


    this.retornarmaterias();

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

  retornarmaterias(){
    this.bandera=true;
    this.http.get(`${this.url}/colegio/profesor/materias/${this.legajo}`)
    .subscribe( data=> {
    this.materias=data;
    this.bandera=false;
    this.mostrar1=!this.mostrar1;
    });
    
  }

  cargarevaluaciones(m:any){
    this.mostrar1=!this.mostrar1;
    this.bandera=true;
    this.http.get(`${this.url}/evaluacion/todas/cargadas/${m.materia.nombre}/${this.legajo}/${m.materia.anio.numero}/${m.division.nombre}`)
    .subscribe( data=> {
    this.evaluaciones=data;
    this.bandera=false;
    this.mostrar2=!this.mostrar2;
    });

  }

  cargarnotas(m:any){
    this.mostrar2=!this.mostrar2;
    this.mostrar3=!this.mostrar3;
    this.aprobados=0;this.desaprobados=0;
    this.http.get(`${this.url}/evaluacion/display/${m.folio}`)
    .subscribe( data=> {
    this.evaluacion=data;
    this.notas=this.evaluacion.notas;
    console.log(this.notas);

    for (let index = 0; index < this.notas.length; index++) {

      if ( this.notas[index].nota>=6){
        this.aprobados++;
      }else{
        this.desaprobados++;
      }
      
    }

    const chart = new CanvasJS.Chart('chartContainer', {
      theme: 'light1',
      animationEnabled: true,
      exportEnabled: true,
      backgroundColor: '#E6E6E6',
      title:{
        text: 'Grafico'
      },
      data: [{
        type: 'pie',
        showInLegend: true,
        toolTipContent: '<b>{name}</b>: Alumnos {y} (#percent%)',
        indexLabel: '{name} - #percent%',
        dataPoints: [
          { y: this.aprobados, color:'green', name: 'Aprobados' },
          { y: this.desaprobados, color:'red', name: 'Desaprobados' }
        ]
      }]
    });
      
    chart.render();
    
    
    });
  }

}
