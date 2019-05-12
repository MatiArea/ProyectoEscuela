import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../models/url';
import { map } from 'rxjs/operators'; 
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  constructor( public http:HttpClient ) { }

  url=Url;
// ======================================================
  boletin(legajo:any,dni:any,fecha:any,trimestre:any){
   return this.http.post(`${this.url}/notificaciones/boletin/enviar/alumno`,
    {
      legajoAlumno:legajo,
      dniPreceptor:dni,
      fecha:fecha,
      trimestre:trimestre
    });
  }
// ======================================================
  avisoDivision(titulo:any,descripcion:any,cuerpo:any,fecha:any,rol:any,dni:any,division:any){
   return this.http.post(`${this.url}/notificaciones/aviso/enviar/division`,
    {
    titulo:titulo,
    descripcion:descripcion,
    cuerpo:cuerpo,
    fecha:fecha,
    rollAutor:rol,
    dniAutor:dni,
    divisionID:division
    });
  }
// ======================================================
  evaluacionDivision(legajo:any,divisionNombre:any,anioNumero:any,folio:any,fecha:any){
   return this.http.post(`${this.url}/notificaciones/evaluacion/enviar/division`,
    {
      legajo:legajo,
      division:divisionNombre,
      anio:anioNumero,
      folio:folio,
      fecha:fecha
    });
  }
// ======================================================
  obtenerNotificacionesAlumno(legajo:any){
    return this.http.get(`${this.url}/notificaciones/all/${legajo}`)
    .pipe(map((data: any) =>{
      return data;
    }));
  }
// ======================================================
  obtenerUnaNotificacion(id:any){
    return  this.http.get(`${this.url}/notificaciones/display/${id}`)
    .pipe(map((data: any) =>{
      return data;
    }));
  }
}
