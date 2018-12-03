import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-barrainferior',
  templateUrl: './barrainferior.component.html',
  styleUrls: ['./barrainferior.component.css']
})
export class BarrainferiorComponent implements OnInit {

  constructor( private router:Router ) { }

  usuario = localStorage.getItem( 'email' );
  rol = localStorage.getItem( 'rol' );

  notificaciones:any[] =[
    {nombre:'Notificacion 1',descripcion:'Notis'},
    {nombre:'Notificacion 2',descripcion:'Notis'},
    {nombre:'Notificacion 3',descripcion:'Notis'},
    {nombre:'Notificacion 4',descripcion:'Notis'},
    {nombre:'Notificacion 5',descripcion:'Notis'},
  ];

  ngOnInit() {
  }




  unlogin() {
    localStorage.clear();
    this.router.navigate(['login']);

  }

  hola() {
    console.log('hola');
  }
}
