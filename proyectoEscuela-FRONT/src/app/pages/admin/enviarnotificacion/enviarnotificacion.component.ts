import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-enviarnotificacion',
  templateUrl: './enviarnotificacion.component.html',
  styleUrls: ['./enviarnotificacion.component.css']
})
export class EnviarnotificacionComponent implements OnInit {

  constructor( private http: HttpClient ) { }

  anios:any;
  divisiones:any;
  fecha=new Date();
  rol:any;
  dni:any;
 fechaactual:string;
  ngOnInit() {
    this.fecha.setMonth( this.fecha.getMonth() + 1 );
    this.fechaactual='' + this.fecha.getFullYear() + '/' + this.fecha.getMonth() + '/' + this.fecha.getDate();
     return this.http.get('http://localhost:4000/colegio/anios')
    .subscribe( data=> {
    this.anios=data;
   } );

  }

  getdivisiones(anio:any){
    
    return this.http.get(`http://localhost:4000/colegio/divisiones/${anio}`)
    .subscribe( data=> {
    this.divisiones=data;
   } );

  }


  enviarnot( not:NgForm ) {
    this.rol=localStorage.getItem( 'rol' );
    this.dni=localStorage.getItem( 'dni' );

    

    this.http.post('http://localhost:4000/notificaciones/aviso/enviar/division',
    {
    titulo:not.value.titulo,
    descripcion:not.value.descripcion,
    cuerpo:not.value.cuerpo,
    fecha:this.fechaactual,
    rollAutor:this.rol,
    dniAutor:this.dni,
    divisionID:not.value.division
    }).subscribe((data:any)=>{
    });
  }

}
