import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-aviso',
  templateUrl: './aviso.component.html',
  styleUrls: ['./aviso.component.css']
})
export class AvisoComponent implements OnInit {

  notificacion:any;
  id:any;
  paramactual:any=0;


  constructor( private route:ActivatedRoute, private router:Router, private http: HttpClient ) { 
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

    this.id = this.route.snapshot.params['id'];
    return this.http.get(`http://localhost:4000/notificaciones/display/${this.id}`)
    .subscribe( data=> {
    this.notificacion=data;
  } );
  
  }
 
}
  





