import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CanvasJS from '../../../../node_modules/canvasjs-2.3.1/canvasjs.min';


@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  mostrar1=false;
  mostrar2=true;

  prueba:any;
  date=new Date();

  constructor( private http: HttpClient ) { }


   cambiar(){
    this.mostrar2 = !this.mostrar2 ;
    this.mostrar1 = !this.mostrar1 ;
   
    
   }


  ngOnInit() {
  
    let chart = new CanvasJS.Chart("chartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Monthly Expense"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: 1, name: "Comida" },
          { y: 1, name: "Insurance" },
          { y: 1, name: "Traveling" },
          { y: 1, name: "Housing" },
          { y: 1, name: "Education" },
          { y: 1, name: "Shopping"},
          { y: 2, name: "Others" }
        ]
      }]
    });
      
    chart.render();
    
  }

  getdata() {
     return this.http.get('http://localhost:4000/colegio/alumno/materias/5275920')
   .subscribe( data=> {
   console.log(data);
  } );
 }


}


// getdata() {
  // return this.http.get('http://localhost:4000/colegio/anios')
  // .subscribe( data=> {
   // console.log(data);
  // } );
// }
