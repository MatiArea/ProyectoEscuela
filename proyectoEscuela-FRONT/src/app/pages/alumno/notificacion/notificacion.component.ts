import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Url } from '../../../models/url';
import { NotificacionService } from '../../../services/notificacion/notificacion.service';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {

  url=Url;
  notificacion:any;
  id:any;
  paramactual:any=0;
  bandera:boolean;


  constructor( private route:ActivatedRoute, private router:Router, private http: HttpClient, private notifacionService:NotificacionService ) { 
   this.route.params.subscribe((params)=>{ 
      if( this.paramactual !== params && this.paramactual !== 0 ) {
        window.location.reload();
      }
     });
   }

 
   ngOnInit(){

    this.route.params.subscribe((params)=>{ 
      this.paramactual=params;
     });    
  
     this.retornarnotificaciones();
  }
// ======================================================
  retornarnotificaciones(){
    this.bandera=true;
    this.id = this.route.snapshot.params['id'];
    this.notifacionService.obtenerUnaNotificacion(this.id)
    .subscribe( data=> {
    this.notificacion=data;
    this.bandera=false;
  } );
  }
// ======================================================
 
}
  





