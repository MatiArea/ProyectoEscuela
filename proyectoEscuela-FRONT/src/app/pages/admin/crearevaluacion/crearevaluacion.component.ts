import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MateriaIndice } from 'src/app/models/materiasindice';
import { Url } from '../../../models/url';

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
 


  constructor( private http: HttpClient ) { }

  ngOnInit() {
    this.legajo=localStorage.getItem( 'legajo' );



    this.http.get(`${this.url}/colegio/profesor/materias/${this.legajo}`)
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


   



   this.http.get(`${this.url}/evaluacion/folio`)
   .subscribe( data=> {
   this.folio=data;
  } );

  }

  capturar(mat:any){
    this.indice=mat; 
  }

  enviarevaluacion(evalu:any){
    this.http.post(`${this.url}/evaluacion/create`,
    {
    fecha:evalu.value.fecha,
    folio:this.folio,
    temas:evalu.value.temas,
    titulo:evalu.value.titulo,
    legajoProfesor:this.legajo,
    division:this.materiasindice[this.indice].division,
    anio:this.materiasindice[this.indice].anio,
    materia:this.materiasindice[this.indice].nombremateria
    }).subscribe((data:any)=>{
    });

    

  }

}
