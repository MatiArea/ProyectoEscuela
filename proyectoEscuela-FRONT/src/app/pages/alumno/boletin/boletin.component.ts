import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boletin',
  templateUrl: './boletin.component.html',
  styleUrls: ['./boletin.component.css']
})
export class BoletinComponent implements OnInit {

  constructor() { }

   materias:any[] =[
     {nombre:'Matematica',Nota1:'10',Nota2:'10',Nota3:'10',promedio:'10'},
     {nombre:'Lengua',Nota1:'10',Nota2:'10',Nota3:'10',promedio:'10'},
     {nombre:'Musica',Nota1:'10',Nota2:'10',Nota3:'10',promedio:'10'},
     {nombre:'Religion',Nota1:'10',Nota2:'10',Nota3:'10',promedio:'10'},
     {nombre:'Educacion Fisica',Nota1:'10',Nota2:'10',Nota3:'10',promedio:'10'},
   ];

  ngOnInit() {
  }
}
