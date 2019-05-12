import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../../models/url';
import { NotificacionService } from '../../../services/notificacion/notificacion.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  constructor( private http: HttpClient, private notificacionService:NotificacionService ) { }

  url=Url;
  notificaciones:any;
  legajo:any;
  bandera:boolean;
  ngOnInit() {
    this.retornarnotificaciones();
  }
// ======================================================
  retornarnotificaciones(){
    this.bandera=true;
    this.legajo=localStorage.getItem( 'legajo' );
    this.notificacionService.obtenerNotificacionesAlumno(this.legajo)
    .subscribe( data=> {
    this.notificaciones=data;
    this.bandera=false;
   } );
  }
// ======================================================




}
