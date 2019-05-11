import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../../models/url';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  constructor( private http: HttpClient ) { }

  url=Url;
  notificaciones:any;
  legajo:any;
  bandera:boolean;
  ngOnInit() {
    this.retornarnotificaciones();
  }


  retornarnotificaciones(){
    this.bandera=true;
    this.legajo=localStorage.getItem( 'legajo' );
      return this.http.get(`${this.url}/notificaciones/all/${this.legajo}`)
    .subscribe( data=> {
    this.notificaciones=data;
    this.bandera=false;
   } );
  }




}
