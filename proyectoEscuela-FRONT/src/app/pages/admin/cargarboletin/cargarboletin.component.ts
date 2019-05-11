import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotasBol } from '../../../models/notaboletin';
import { Url } from '../../../models/url';


@Component({
  selector: 'app-cargarboletin',
  templateUrl: './cargarboletin.component.html',
  styleUrls: ['./cargarboletin.component.css']
})
export class CargarBoletinComponent implements OnInit {

  url=Url;
  mostrar1=false;
  mostrar2=false;
  mostrar3=false;
  mostrar4=false;
  mostrar5=false;
  anio:any;
  alumnos:any;
  alumno:any;
  divisiones:any;
  boletin:any;
  trimestre1:boolean;
  trimestre2:boolean;
  trimestre3:boolean;
  valtri1=false;
  valtri2=false;
  valtri3=false;
  trimestreactual:number;
  notasboletin:NotasBol[]=[];
  lareputramadre:number;
  dni:any;
  fecha=new Date();
  fechaactual:string;
  bandera:boolean;

  
  constructor( private http: HttpClient ) { }
  
  

  ngOnInit() {

    this.dni=localStorage.getItem( 'dni' );
    this.fecha.setMonth( this.fecha.getMonth() + 1 );
    this.fechaactual='' + this.fecha.getFullYear() + '/' + this.fecha.getMonth() + '/' + this.fecha.getDate();

    this.cargaranos();
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

  cambiar4(){
    this.mostrar4 = !this.mostrar4 ;
    this.mostrar5 = !this.mostrar5 ;
  }





  cargaranos(){
    this.bandera=true;
    this.http.get(`${this.url}/colegio/anios/divisiones`)
    .subscribe( data=> {
    this.anio=data;
    this.bandera=false;
    this.mostrar1=!this.mostrar1;
   } );
  }

  cargardivisiones(a:any){
    this.mostrar1 = !this.mostrar1 ;
    this.bandera=true;
    this.http.get(`${this.url}/colegio/divisiones/${a.numero}`)
    .subscribe( data=> {
    this.divisiones=data;
    this.bandera=false;
    this.mostrar2 = !this.mostrar2 ;
 
   } );
    

  }

  cargaralumnos(d:any){
    this.mostrar2 = !this.mostrar2 ;
    this.bandera=true;
    this.http.get(`${this.url}/colegio/alumnos/${d.id}`)
   .subscribe( data=> {
     this.alumnos=data;
     this.bandera=false;
    this.mostrar3 = !this.mostrar3 ;

  } );    
  
  }

  cargarmaterias(a:any){
    this.mostrar3 = !this.mostrar3 ;
    this.bandera=true;
    this.alumno=a;
    this.http.get(`${this.url}/boletin/materias/alumno/${a.codigo}`)
   .subscribe( data=> {
   this.boletin=data;
   this.trimestre1=this.boletin.boletin.trimestre1;
   this.trimestre2=this.boletin.boletin.trimestre2;
   this.trimestre3=this.boletin.boletin.trimestre3;

   if( this.trimestre1===false ){
     this.valtri1=true;
    } else if ( this.trimestre2===false ){
     this.valtri2=true;
    } else if ( this.trimestre3===false ) {
     this.valtri3=true;
  }
    this.bandera=false;
    this.mostrar4 = !this.mostrar4 ;

  } );  

  }


  trimestre(b:number){
    this.mostrar4 = !this.mostrar4 ;

    if (b===1) {
      this.trimestreactual=1;      
    }else if( b===2){
      this.trimestreactual=2;
    }else if(b===3){
      this.trimestreactual=3;
    }
    this.mostrar5 = !this.mostrar5 ;

  }

  cargarboletin(b:any){
   for (let index = 0; index < this.boletin.materias.length; index++) {
    this.notasboletin[index] = {
      idMateria: this.boletin.materias[index].id,
      nota: b._directives[index].viewModel
  };
   
  }

    

  this.http.post(`${this.url}/boletin/notas/insert`,
  {
    idBoletin:this.boletin.boletin.id,
    trimestre:this.trimestreactual,
    notas:this.notasboletin
  }).subscribe((data:any)=>{
  });

  
  this.http.get(`${this.url}/boletin/update/${this.boletin.boletin.id}/${this.trimestreactual}` )
    .subscribe((data:any)=>{
    });


    this.http.post(`${this.url}/notificaciones/boletin/enviar/alumno`,
    {
      legajoAlumno:this.alumno.alumno.legajo,
      dniPreceptor:this.dni,
      fecha:this.fechaactual,
      trimestre:this.trimestreactual
    }).subscribe((data:any)=>{
    });
  

  }

 


}
