import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CanvasJS from '../../../../../node_modules/canvasjs-2.3.1/canvasjs.min';


@Component({
  selector: 'app-listadomaterias',
  templateUrl: './listadomaterias.component.html',
  styleUrls: ['./listadomaterias.component.css']
})
export class ListadomateriasComponent implements OnInit {

  constructor( private http: HttpClient ) { }

  mostrar1=false;
  mostrar2=true;
  mostrar3=true;
  legajo:any;
  materias:any;
  evaluaciones:any;
  evaluacion:any;
  notas:any;
  nota1=0;
  nota2=0;
  nota3=0;
  nota4=0;
  nota5=0;
  nota6=0;
  nota7=0;
  nota8=0;
  nota9=0;
  nota10=0;



  ngOnInit() {

    

    this.legajo=localStorage.getItem( 'legajo' );



    this.http.get(`http://localhost:4000/colegio/profesor/materias/${this.legajo}`)
    .subscribe( data=> {
    this.materias=data;
    });
    

  }
///////////////////////////////////////////////////////////////////

  cambiar1(){
    this.mostrar2 = !this.mostrar2 ;
    this.mostrar1 = !this.mostrar1 ; 
  }

  cambiar2(){
    this.mostrar2 = !this.mostrar2 ;
    this.mostrar3 = !this.mostrar3 ;   
  }

  volver1(){
    this.mostrar2 = !this.mostrar2 ;
    this.mostrar3 = !this.mostrar3 ;   
  }

  cargarevaluaciones(m:any){
    this.http.get(`http://localhost:4000/evaluacion/todas/cargadas/${m.materia.nombre}/${this.legajo}/${m.materia.anio.numero}/${m.division.nombre}`)
    .subscribe( data=> {
    this.evaluaciones=data;
    });

  }

  cargarnotas(m:any){
    this.nota1=0;this.nota2=0;this.nota3=0;this.nota4=0;this.nota5=0;this.nota6=0;this.nota7=0;this.nota8=0;this.nota9=0;this.nota10=0;
    this.http.get(`http://localhost:4000/evaluacion/display/${m.folio}`)
    .subscribe( data=> {
    this.evaluacion=data;
    this.notas=this.evaluacion.notas;
    console.log(this.notas);

    for (let index = 0; index < this.notas.length; index++) {

      switch(this.notas[index].nota) { 
        case 1: { 
           this.nota1++; 
           break; 
        } 
        case 2: { 
          this.nota2++; 
           break; 
        }
        case 3: { 
          this.nota3++;
          break; 
       } 
       case 4: { 
        this.nota4++;
        break; 
       } 
       case 5: { 
        this.nota5++; 
        break; 
       } 
       case 6: { 
        this.nota6++;
        break; 
       } 
       case 7: { 
         console.log(7);
        this.nota7++;
        break; 
       } 
       case 8: { 
        this.nota8++;
       break; 
       } 
      case 9: { 
        this.nota9++;
       break; 
       } 
      case 10: { 
        this.nota10++;
      break; 
       }   
        default: { 
           // statements; 
           break; 
        } 
     } 
      
    }

    const chart = new CanvasJS.Chart('chartContainer', {
      theme: 'light1',
      animationEnabled: true,
      exportEnabled: true,
      backgroundColor: '#E6E6E6',
      title:{
        text: 'Grafico'
      },
      data: [{
        type: 'pie',
        showInLegend: true,
        toolTipContent: '<b>{name}</b>: Alumnos {y} (#percent%)',
        indexLabel: '{name} - #percent%',
        dataPoints: [
          { y: this.nota1, name: 'Nota 1' },
          { y: this.nota2, name: 'Nota 2' },
          { y: this.nota3, name: 'Nota 3' },
          { y: this.nota4, name: 'Nota 4' },
          { y: this.nota5, name: 'Nota 5' },
          { y: this.nota6, name: 'Nota 6'},
          { y: this.nota7, name: 'Nota 7' },
          { y: this.nota8, name: 'Nota 8'},
          { y: this.nota9, name: 'Nota 9'},
          { y: this.nota10, name: 'Nota 10'},

        ]
      }]
    });
      
    chart.render();
    
    
    });
  }

}
