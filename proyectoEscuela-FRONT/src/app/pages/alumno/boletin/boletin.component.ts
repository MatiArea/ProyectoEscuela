import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  ngOnInit() {

    this.legajo=localStorage.getItem( 'legajo' );



    this.http.get(`http://localhost:4000/boletin/display/${this.legajo}`)
    .subscribe( data=> {
    this.boletin=data;
    this.notas=this.boletin.notas;
    this.trimestre2=this.boletin.trimestre2;
    this.trimestre3=this.boletin.trimestre3;
    
    for (let index = 0; index < this.notas.length; index++) {
      this.promedio[index] = this.notas[index].nota1;
      
      
    }

    console.log(this.promedio);

    });

   
  }
}
