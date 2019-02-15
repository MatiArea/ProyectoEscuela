import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css']
})
export class MateriasComponent implements OnInit {

  constructor( private http: HttpClient ) { }

  legajo:any;
  materias:any;

  ngOnInit() {

    this.legajo=localStorage.getItem( 'legajo' );
      return this.http.get(`http://localhost:4000/colegio/alumno/materias/${this.legajo}`)
    .subscribe( data=> {
    this.materias=data;
    console.log(this.materias);
   } );

  }

}
