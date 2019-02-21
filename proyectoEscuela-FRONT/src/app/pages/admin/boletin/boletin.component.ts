import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotasBol } from '../../../models/notaboletin';


@Component({
  selector: 'app-boletin',
  templateUrl: './boletin.component.html',
  styleUrls: ['./boletin.component.css']
})
export class BoletinComponent implements OnInit {
  mostrar1=false;
  mostrar2=true;
  mostrar3=true;
  mostrar4=true;
  mostrar5=true;
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

  
  constructor( private http: HttpClient ) { }
  
  

  ngOnInit() {

    this.dni=localStorage.getItem( 'dni' );
    this.fecha.setMonth( this.fecha.getMonth() + 1 );
    this.fechaactual='' + this.fecha.getFullYear() + '/' + this.fecha.getMonth() + '/' + this.fecha.getDate();

    this.http.get(`http://localhost:4000/colegio/anios/divisiones`)
    .subscribe( data=> {
    this.anio=data;
    console.log(this.anio);
   } );
 


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


  cargardivisiones(a:any){

    this.http.get(`http://localhost:4000/colegio/divisiones/${a.numero}`)
    .subscribe( data=> {
    this.divisiones=data;
    console.log(this.divisiones);
 
   } );
    

  }

  cargaralumnos(d:any){

    this.http.get(`http://localhost:4000/colegio/alumnos/${d.id}`)
   .subscribe( data=> {
   this.alumnos=data;
   console.log(this.alumnos);
  } );    
  
  }

  cargarmaterias(a:any){
    this.alumno=a;
    console.log(this.alumno);
    this.http.get(`http://localhost:4000/boletin/materias/alumno/${a.codigo}`)
   .subscribe( data=> {
   this.boletin=data;
   console.log(this.boletin);
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

  } );  

  }


  trimestre(b:number){
    if (b===1) {
      this.trimestreactual=1;      
    }else if( b===2){
      this.trimestreactual=2;
    }else if(b===3){
      this.trimestreactual=3;
    }
  }

  cargarboletin(b:any){
   console.log(b);
   for (let index = 0; index < this.boletin.materias.length; index++) {
    this.notasboletin[index] = {
      idMateria: this.boletin.materias[index].id,
      nota: b._directives[index].viewModel
  };
   
  }

    

  this.http.post('http://localhost:4000/boletin/notas/insert',
  {
    idBoletin:this.boletin.boletin.id,
    trimestre:this.trimestreactual,
    notas:this.notasboletin
  }).subscribe((data:any)=>{
    console.log(data);
  });

  
  this.http.get(`http://localhost:4000/boletin/update/${this.boletin.boletin.id}/${this.trimestreactual}` )
    .subscribe((data:any)=>{
      console.log(data);
    });


    this.http.post('http://localhost:4000/notificaciones/boletin/enviar/alumno',
    {
      legajoAlumno:this.alumno.alumno.legajo,
      dniPreceptor:this.dni,
      fecha:this.fechaactual,
      trimestre:this.trimestreactual
    }).subscribe((data:any)=>{
      console.log(data);
    });
  

  }

 


}
