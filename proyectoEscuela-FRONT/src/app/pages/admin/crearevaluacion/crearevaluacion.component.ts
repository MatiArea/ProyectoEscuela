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
  materia:any;
  folio:any;
  anio:any;
  division:any;

 


  constructor( private http: HttpClient ) { }

  ngOnInit() {
    this.legajo=localStorage.getItem( 'legajo' );



    this.http.get(`http://localhost:4000/colegio/profesor/materias/${this.legajo}`)
    .subscribe( data=> {
    this.materias=data;
    console.log(data);
   } );

   this.http.get(`http://localhost:4000/evaluacion/folio`)
   .subscribe( data=> {
   this.folio=data;
   console.log(this.folio);
  } );

  }

  capturar(mat:any){
    console.log(JSON.stringify(mat));    
  }

  enviarevaluacion(evalu:any){
    this.anio = document.getElementById('anio').innerHTML;
    this.division = document.getElementById('division').innerHTML;
    console.log(this.anio,this.division);

    this.http.post('http://localhost:4000/evaluacion/create',
    {
    fecha:evalu.value.fecha,
    folio:this.folio,
    temas:evalu.value.temas,
    titulo:evalu.value.titulo,
    legajoProfesor:this.legajo,
    division:this.division,
    anio:this.anio,
    materia:evalu.value.materia
    }).subscribe((data:any)=>{
      console.log(data);
    });

  }

}
