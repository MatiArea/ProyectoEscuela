import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  constructor() { }

  bandera:boolean;
  mostrar1=true;
  mostrar2=false;
  mostrar3=false;

  ngOnInit() {
  }

  cambiar1(){
    this.mostrar1 = !this.mostrar1 ;
    this.mostrar2 = !this.mostrar2 ;
  }

  cambiar2(){
    this.mostrar1 = !this.mostrar1 ;
    this.mostrar3 = !this.mostrar3 ;
  }

}
