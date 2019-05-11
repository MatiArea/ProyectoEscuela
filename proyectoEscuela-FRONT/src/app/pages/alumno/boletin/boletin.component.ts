import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotaBoletinMostrar } from 'src/app/models/notaboletinamostrar';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
import { Url } from '../../../models/url';

@Component({
  selector: 'app-boletin',
  templateUrl: './boletin.component.html',
  styleUrls: ['./boletin.component.css']
})
export class BoletinComponent implements OnInit {

  constructor( private http: HttpClient ) { }

  url=Url;
  legajo:any;
  boletin:any;
  notas:any;
  trimestre1:boolean;
  trimestre2:boolean;
  trimestre3:boolean;
  promedio=[];
  mostrarpromedio:boolean;
  notamostrar:NotaBoletinMostrar[]=[];
  alumnonombre:any;
  alumnoapellido:any;
  data:any;
  imgWidth:any;
  pageHeight:any;
  imgHeight:any;
  heightLeft:any;
  pdf:any;
  position:any;
  aniodivision:any;
  bandera:any;



  ngOnInit() {

    this.legajo=localStorage.getItem( 'legajo' );
    this.alumnonombre=localStorage.getItem( 'email' );
    this.alumnoapellido=localStorage.getItem( 'apellido' );

    this.retornarboletin();

    


   
  }

  retornarboletin(){
    this.bandera=true;
    this.http.get(`${this.url}/colegio/alumno/curso/${this.legajo}`)
    .subscribe( data=> {
    this.aniodivision=data;
    });
    

    this.http.get(`${this.url}/boletin/display/${this.legajo}`)
    .subscribe( data=> {
    this.boletin=data;
    this.notas=this.boletin.notas;

    
    this.trimestres();
    
    this.bandera=false;


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

    

    if ( this.trimestre1===true && this.trimestre2===true && this.trimestre3===true ) {
      this.mostrarpromedio=true;
    }



  }

  captureScreen(){
    
    {  
      this.data = document.getElementById('contentToConvert');  
      html2canvas(this.data).then(canvas => {  
        // Few necessary setting options  
        this.imgWidth = 208;   
        this.pageHeight = 295;    
        this.imgHeight = canvas.height * this.imgWidth / canvas.width;  
        this.heightLeft = this.imgHeight;  
    
        const contentDataURL = canvas.toDataURL('image/png');  
        this.pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
        this.position = 0;  
        this.pdf.addImage(contentDataURL, 'PNG', 0, this.position, this.imgWidth, this.imgHeight);  
        this.pdf.save('boletin.pdf'); // Generated PDF   
      });  
    }  
  } 
}

