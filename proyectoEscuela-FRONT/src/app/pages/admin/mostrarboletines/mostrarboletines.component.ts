import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotaBoletinMostrar } from 'src/app/models/notaboletinamostrar';
import { Url } from '../../../models/url';

@Component({
  selector: 'app-mostrarboletines',
  templateUrl: './mostrarboletines.component.html',
  styleUrls: ['./mostrarboletines.component.css']
})
export class MostrarboletinesComponent implements OnInit {

  constructor( private http: HttpClient ) { }

  url=Url;
  mostrar1=false;
  mostrar2=false;
  mostrar3=false;
  mostrar4=false;
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
  bandera:boolean;

  ngOnInit( ) {

    this.retornardivisiones();
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

  retornardivisiones(){
    this.bandera=true;
    this.http.get(`${this.url}/colegio/anios/divisiones`)
    .subscribe( data=> {
    this.anio=data;
    this.bandera=false;
    this.mostrar1=!this.mostrar1;
   } );
 
  }

  cargardivisiones(a:any){
    this.mostrar1=!this.mostrar1;
    this.bandera=true;
    this.http.get(`${this.url}/colegio/divisiones/${a.numero}`)
    .subscribe( data=> {
    this.divisiones=data;
    this.bandera=false;
    this.mostrar2=!this.mostrar2;
 
   } );
    

  }

  cargaralumnos(d:any){
    this.mostrar2=!this.mostrar2;
    this.bandera=true;
    this.http.get(`${this.url}/colegio/alumnos/${d.id}`)
   .subscribe( data=> {
   this.alumnos=data;
   this.bandera=false;
   this.mostrar3=!this.mostrar3;
  } );    
  
  }


  cargarmaterias(a:any){
    this.mostrar3=!this.mostrar3;
    this.bandera=true;
    this.http.get(`${this.url}/boletin/display/${a.alumno.legajo}`)
    .subscribe( data=> {
    this.boletin=data;
    this.notas=this.boletin.notas;



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

    

    if ( this.trimestre1===true && this.trimestre2===true && this.trimestre3===true ) {
      this.mostrarpromedio=true;
    }
  });

  this.bandera=false;
  this.mostrar4=!this.mostrar4;
}
}
