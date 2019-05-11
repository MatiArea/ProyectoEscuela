import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notas } from 'src/app/models/notas';
import { Url } from '../../../models/url';

@Component({
  selector: 'app-cargarevaluacion',
  templateUrl: './cargarevaluacion.component.html',
  styleUrls: ['./cargarevaluacion.component.css']
})
export class CargarEvaluacionComponent implements OnInit {

  mostrar1=false;
  mostrar2=false;
  mostrar3=false;

  constructor( private http: HttpClient ) { }

  url=Url;
  legajo:any;
  materias:any;
  materia:any;
  evaluaciones:any;
  materiaañodivision:any;
  alumnos:any;
  folio:any;
  notas:Notas[]=[];
  fecha=new Date();
  fechaactual:string;
  bandera:boolean;


  ngOnInit() {

    this.legajo=localStorage.getItem( 'legajo' );
    this.fecha.setMonth( this.fecha.getMonth() + 1 );
    this.fechaactual='' + this.fecha.getFullYear() + '/' + this.fecha.getMonth() + '/' + this.fecha.getDate();


    this.retornarmaterias();
    
    
  }

  cambiar1(){
    this.mostrar2 = !this.mostrar2 ;
    this.mostrar1 = !this.mostrar1 ;    
   }

   cambiar2(){
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
  
  
  
  
  
   cargarmateria(m:any){
    this.mostrar1=!this.mostrar1;
    this.bandera=true;
    this.materia=m;
    this.http.get(`${this.url}/evaluacion/cargarNotas/${m.materia.nombre}/${this.legajo}/${m.materia.anio.numero}/${m.division.nombre}`)
    .subscribe( data=> {
    this.evaluaciones=data;
    this.bandera=false;
    this.mostrar2=!this.mostrar2;
    });
   }

   
   
   
   
   cargaralumnos(e:any){
    this.mostrar2=!this.mostrar2;
    this.bandera=true;
    this.folio=e.folio;
    this.http.get(`${this.url}/colegio/alumnos/${this.materia.materia.anio.numero}/${this.materia.division.nombre}`)
    .subscribe( data=> {
    this.alumnos=data;
    this.bandera=false;
    this.mostrar3=!this.mostrar3;
    });

   }

   
   
   
   
   
   
   cargarnotas(e:any){
  
    
  
    for (let index = 0; index < this.alumnos.length; index++) {
     
      this.notas[index] = {
        codigoMatricula: this.alumnos[index].codigo,
        nota: e._directives[index].viewModel
    };
  }


  this.http.post(`${this.url}/evaluacion/cargarNotas/insert`,
  {
    folioEvaluacion:this.folio,
    notas:this.notas
  }).subscribe((data:any)=>{
    
  });


  this.http.put(`${this.url}/evaluacion/cargarNotas/update/${this.folio}`,this.folio)
    .subscribe((data:any)=>{
      
    });
  

    this.http.post(`${this.url}/notificaciones/evaluacion/enviar/division`,
    {
      legajo:this.legajo,
      division:this.materia.division.nombre,
      anio:this.materia.materia.anio.numero,
      folio:this.folio,
      fecha:this.fechaactual
    }).subscribe((data:any)=>{
    });

   }
}
