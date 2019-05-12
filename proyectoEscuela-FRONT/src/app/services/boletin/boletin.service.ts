import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../models/url';
import { map } from 'rxjs/operators'; 
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class BoletinService {

  constructor( public http:HttpClient ) { }

  url=Url;
// ======================================================
  obtenerTodosBoletin(){

   return this.http.get(`${this.url}/boletin/all`)
   .pipe(map((data: any) =>{
     return data;
   }));
// ======================================================
  }
  obtenerMaterias(codigo:any){

   return this.http.get(`${this.url}/boletin/materias/alumno/${codigo}`)
    .pipe(map((data: any) =>{
      return data;
    }));
 
   }
// ======================================================
  cargarBoletin(boletin:any,trimestre:any,notas:any){

   return this.http.post(`${this.url}/boletin/notas/insert`,
    {
      idBoletin:boletin.boletin.id,
      trimestre:trimestre,
      notas:notas
    });

   }
// ======================================================
   actualizarTriBoletin(boletin:any,trimestre:any){

    return this.http.get(`${this.url}/boletin/update/${boletin}/${trimestre}` )
     .pipe(map((data: any) =>{
      return data;
    }));
   }
// ======================================================
   obtenerBoletin(legajo){

    return this.http.get(`${this.url}/boletin/display/${legajo}`)
    .pipe(map((data: any) =>{
      return data;
    }));
   }
 // ======================================================

}
