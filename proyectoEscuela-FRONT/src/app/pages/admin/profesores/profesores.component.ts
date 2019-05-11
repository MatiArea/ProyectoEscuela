import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  constructor() { }

  mostrar1=true;
  mostrar2=false;
  mostrar3=false;
  bandera:boolean;

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
