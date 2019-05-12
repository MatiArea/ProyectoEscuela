import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MateriaIndice } from 'src/app/models/materiasindice';
import { Url } from '../../../models/url';
import { ColegioService } from '../../../services/colegio/colegio.service';
import { EvaluacionService } from '../../../services/evaluacion/evaluacion.service';

@Component({
  selector: 'app-crearevaluacion',
  templateUrl: './crearevaluacion.component.html',
  styleUrls: ['./crearevaluacion.component.css']
})
export class CrearevaluacionComponent implements OnInit {

  url=Url;
  materias:any;
  legajo:any;
  body:any;
  materia:any;
  folio:any;
  anio:any;
  division:any;
  materiasindice:MateriaIndice[]=[];
  indice:any;
 


  constructor( private http: HttpClient, private colegioService:ColegioService, private evaluacionService:EvaluacionService ) { }

  ngOnInit() {
    this.legajo=localStorage.getItem( 'legajo' );

    this.retornarMateriasProfesor();
    this.retornarFolio();

  }
// ======================================================  
  retornarMateriasProfesor(){
    this.colegioService.obtenerMateriasProfesor(this.legajo)
    .subscribe( data=> {
    this.materias=data;
    for (let index = 0; index < this.materias.length; index++) {
      this.materiasindice[index] = {
        id: index,
        nombremateria:this.materias[index].materia.nombre,
        division:this.materias[index].division.nombre,
        anio:this.materias[index].materia.anio.numero    
        };
      }
   } );
  }
// ======================================================
  retornarFolio(){
    this.evaluacionService.obtenerFolio()
    .subscribe( data=> {
    this.folio=data;
   } );
  }
// ======================================================
  capturar(mat:any){
    this.indice=mat; 
  }
// ======================================================
  enviarevaluacion(evalu:any){
    this.evaluacionService.crearEvaluacion(evalu.value.fecha,this.folio,evalu.value.temas,evalu.value.titulo,this.legajo,this.materiasindice[this.indice].division,this.materiasindice[this.indice].anio,this.materiasindice[this.indice].nombremateria)
   .subscribe((data:any)=>{
    });
  }
// ======================================================
}
