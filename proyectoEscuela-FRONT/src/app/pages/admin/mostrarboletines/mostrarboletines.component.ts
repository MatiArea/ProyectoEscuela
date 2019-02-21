import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotaBoletinMostrar } from 'src/app/models/notaboletinamostrar';


@Component({
  selector: 'app-mostrarboletines',
  templateUrl: './mostrarboletines.component.html',
  styleUrls: ['./mostrarboletines.component.css']
})
export class MostrarboletinesComponent implements OnInit {

  constructor( private http: HttpClient ) { }

  mostrar1=false;
  mostrar2=true;
  mostrar3=true;
  mostrar4=true;
  anio:any;
  divisiones:any;
  alumnos:any;
  trimestre1:boolean;
  trimestre2:boolean;
  trimestre3:boolean;
  boletin:any;
  notas:any;
  notamostrar:NotaBoletinMostrar[]=[];
  mostrarpromedio:any;

  ngOnInit( ) {

    this.http.get(`http://localhost:4000/colegio/anios/divisiones`)
    .subscribe( data=> {
    this.anio=data;
    console.log(this.anio);
   } );
 
  }


  
  cambiar1(){
    this.mostrar1 = !this.mostrar1 ;
    this.mostrar2 = !this.mostrar2 ;
  }

  cambiar2(){
    this.mostrar2 = !this.mostrar2 ;
    this.mostrar3 = !this.mostrar3 ;
  }


  cambiar3(){
    this.mostrar3 = !this.mostrar3 ;
    this.mostrar4 = !this.mostrar4 ;
  }

  cargardivisiones(a:any){

    this.http.get(`http://localhost:4000/colegio/divisiones/${a.numero}`)
    .subscribe( data=> {
    this.divisiones=data;
    console.log(this.divisiones);
 
   } );
    

  }

  cargaralumnos(d:any){

    this.http.get(`http://localhost:4000/colegio/alumnos/${d.id}`)
   .subscribe( data=> {
   this.alumnos=data;
   console.log(this.alumnos);
  } );    
  
  }


  cargarmaterias(a:any){

    this.http.get(`http://localhost:4000/boletin/display/${a.alumno.legajo}`)
    .subscribe( data=> {
    this.boletin=data;
    this.notas=this.boletin.notas;
    console.log(this.notas);



    this.trimestre1=this.boletin.boletin.trimestre1;
    this.trimestre2=this.boletin.boletin.trimestre2;
    this.trimestre3=this.boletin.boletin.trimestre3;
    
    for (let index = 0; index < this.notas.length; index++) {
      this.notamostrar[index]={
        materia:this.notas[index].materia.nombre,
        nota1:this.notas[index].nota1,
        nota2:this.notas[index].nota2,
        nota3:this.notas[index].nota3,
        promedio:(this.notas[index].nota1+this.notas[index].nota2+this.notas[index].nota3)/3
      };
    }
    console.log(this.notamostrar);

    

    if ( this.trimestre1===true && this.trimestre2===true && this.trimestre3===true ) {
      this.mostrarpromedio=true;
    }
  });

}
}
