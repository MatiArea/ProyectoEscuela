import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotaBoletinMostrar } from 'src/app/models/notaboletinamostrar';

@Component({
  selector: 'app-boletin',
  templateUrl: './boletin.component.html',
  styleUrls: ['./boletin.component.css']
})
export class BoletinComponent implements OnInit {

  constructor( private http: HttpClient ) { }

  legajo:any;
  boletin:any;
  notas:any;
  trimestre1:boolean;
  trimestre2:boolean;
  trimestre3:boolean;
  promedio=[];
  mostrarpromedio:boolean;
  notamostrar:NotaBoletinMostrar[]=[];

  ngOnInit() {

    this.legajo=localStorage.getItem( 'legajo' );



    this.http.get(`http://localhost:4000/boletin/display/${this.legajo}`)
    .subscribe( data=> {
    this.boletin=data;
    this.notas=this.boletin.notas;
    console.log(this.notas);

    
    this.trimestres();
  

    });


   
  }


  trimestres(){
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
  }
}
