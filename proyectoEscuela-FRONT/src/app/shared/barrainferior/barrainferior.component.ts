import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-barrainferior',
  templateUrl: './barrainferior.component.html',
  styleUrls: ['./barrainferior.component.css']
})
export class BarrainferiorComponent implements OnInit {

  constructor( private router:Router , private http: HttpClient) { }

  usuario = localStorage.getItem( 'email' );
  rol = localStorage.getItem( 'rol' );
  legajo:any;
  notificaciones:any;
  cantidad:any;
  mostrar1=false;

  ngOnInit() {
    
    

    this.legajo=localStorage.getItem( 'legajo' );
    this.cargarnotificaciones();
     
   
  }

  cargarnotificaciones(){

    if ( this.rol==='Alumno') {
      return this.http.get(`http://localhost:4000/notificaciones/panel/${this.legajo}`)
    .subscribe( data=> {
    this.notificaciones=data;
    this.cantidad=this.notificaciones.length;
    this.mostrar1=true;   
   } );
   
  }
  } 



  unlogin() {
    localStorage.clear();
    this.router.navigate(['login']);

  }

 update( noti:any ){
    this.router.navigate([`/panel/notificacion/${noti.id}`]);
    this.http.put(`http://localhost:4000/notificaciones/update/${noti.id}'`,noti.id)
    .subscribe((data:any)=>{
      console.log(data);
      this.cargarnotificaciones();
    });
}
}
