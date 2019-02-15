import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crearevaluacion',
  templateUrl: './crearevaluacion.component.html',
  styleUrls: ['./crearevaluacion.component.css']
})
export class CrearevaluacionComponent implements OnInit {

  materias:any;
  legajo:any;
  body:any;


  constructor( private http: HttpClient ) { }

  ngOnInit() {
    this.legajo=localStorage.getItem( 'legajo' );



    this.http.get(`http://localhost:4000/colegio/profesor/materias/${this.legajo}`)
    .subscribe( data=> {
    this.materias=data;
    console.log(data);
   } );

  }

  guardar(materia:any){
     this.body = JSON.parse(materia);
     console.log(this.body); 
  }

  enviarevaluacion(evalu:any){
    console.log(evalu.value);

    this.http.post('http://localhost:4000/evaluacion/create',
    {
    fecha:evalu.value.fecha,
    folio:evalu.value.folio,
    temas:evalu.value.temas,
    titulo:evalu.value.titulo,
    legajoProfesor:this.legajo,
    division:evalu.value.materia.division.nombre,
    anio:evalu.value.materia.materia.anio.numero,
    materia:evalu.value.materia
    }).subscribe((data:any)=>{
      console.log(data);
    });

  }

}
/*
    
*/