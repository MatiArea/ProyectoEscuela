import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../../models/url';
import { ColegioService } from '../../../services/colegio/colegio.service';
import { NotificacionService } from '../../../services/notificacion/notificacion.service';


@Component({
  selector: 'app-enviarnotificacion',
  templateUrl: './enviarnotificacion.component.html',
  styleUrls: ['./enviarnotificacion.component.css']
})
export class EnviarnotificacionComponent implements OnInit {

  constructor( private http: HttpClient, private colegioService:ColegioService, private notificacionService:NotificacionService ) { }

  url=Url;
  anios:any;
  divisiones:any;
  fecha=new Date();
  rol:any;
  dni:any;
 fechaactual:string;
  ngOnInit() {
    this.fecha.setMonth( this.fecha.getMonth() + 1 );
    this.fechaactual='' + this.fecha.getFullYear() + '/' + this.fecha.getMonth() + '/' + this.fecha.getDate();
    this.retornarAnios();
  }
// ======================================================
  retornarAnios(){
    this.http.get(`${this.url}/colegio/anios`)
    .subscribe( data=> {
    this.anios=data;
   });
  }
// ======================================================
  getdivisiones(anio:any){
    
    this.colegioService.obtenerDivisiones(anio)
    .subscribe( data=> {
    this.divisiones=data;
   });
  }
// ======================================================
  enviarnot( not:NgForm ) {
    this.rol=localStorage.getItem( 'rol' );
    this.dni=localStorage.getItem( 'dni' );
    
    this.notificacionService.avisoDivision(not.value.titulo,not.value.descripcion,not.value.cuerpo,this.fechaactual,this.rol,this.dni,not.value.division).subscribe((data:any)=>{});
  }
}
