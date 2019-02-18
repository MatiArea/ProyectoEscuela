import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notas } from 'src/app/models/notas';

@Component({
  selector: 'app-listadomateva',
  templateUrl: './listadomateva.component.html',
  styleUrls: ['./listadomateva.component.css']
})
export class ListadomatevaComponent implements OnInit {

  mostrar1=false;
  mostrar2=true;
  mostrar3=true;

  constructor( private http: HttpClient ) { }

  legajo:any;
  materias:any;
  materia:any;
  evaluaciones:any;
  materiaañodivision:any;
  alumnos:any;
  folio:any;
  notas:Notas[]=[];

  ngOnInit() {

    this.legajo=localStorage.getItem( 'legajo' );



    this.http.get(`http://localhost:4000/colegio/profesor/materias/${this.legajo}`)
    .subscribe( data=> {
    this.materias=data;
    });
    
  }

  cambiar1(){
    this.mostrar2 = !this.mostrar2 ;
    this.mostrar1 = !this.mostrar1 ;    
   }

   cambiar2(){
    this.mostrar2 = !this.mostrar2 ;
    this.mostrar3 = !this.mostrar3 ;   
   }


  
  
  
  
  
   cargarmateria(m:any){
    this.materia=m;
    console.log(m);

    this.http.get(`http://localhost:4000/evaluacion/cargarNotas/${m.materia.nombre}/${this.legajo}/${m.materia.anio.numero}/${m.division.nombre}`)
    .subscribe( data=> {
    this.evaluaciones=data;
    });
   }

   
   
   
   
   cargaralumnos(e:any){
    this.folio=e.folio;
    this.http.get(`http://localhost:4000/colegio/alumnos/${this.materia.materia.anio.numero}/${this.materia.division.nombre}`)
    .subscribe( data=> {
    this.alumnos=data;
    });

   }

   
   
   
   
   
   
   cargarnotas(e:any){
  
    
  
    for (let index = 0; index < this.alumnos.length; index++) {
     
      this.notas[index] = {
        codigoMatricula: this.alumnos[index].codigo,
        nota: e._directives[index].viewModel
    };
  }


  this.http.post('http://localhost:4000/evaluacion/cargarNotas/insert',
  {
    folioEvaluacion:this.folio,
    notas:this.notas
  }).subscribe((data:any)=>{
    
  });


  this.http.put(`http://localhost:4000/evaluacion/cargarNotas/update/${this.folio}`,this.folio)
    .subscribe((data:any)=>{
      
    });
  

   }
}
