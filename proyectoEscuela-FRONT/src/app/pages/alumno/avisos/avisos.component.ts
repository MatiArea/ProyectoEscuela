import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../../models/url';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent implements OnInit {

  constructor( private http: HttpClient ) { }

  url=Url;
  notificaciones:any;
  legajo:any;
  ngOnInit() {
    this.legajo=localStorage.getItem( 'legajo' );
      return this.http.get(`${this.url}/notificaciones/all/${this.legajo}`)
    .subscribe( data=> {
    this.notificaciones=data;
   } );
  }
}
