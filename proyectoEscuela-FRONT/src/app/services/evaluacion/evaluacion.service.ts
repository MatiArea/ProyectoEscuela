import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../models/url';
import { map } from 'rxjs/operators'; 
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  constructor( public http:HttpClient ) { }

  url=Url;
// ======================================================
  obtenerFolio(){
    return this.http.get(`${this.url}/evaluacion/folio`)
    .pipe(map((data: any) =>{
      return data;
    }));
  }
// ======================================================
  crearEvaluacion(fecha:any,folio:any,temas:any,titulo:any,legajo:any,division:any,anio:any,nombreMateria:any){
    return this.http.post(`${this.url}/evaluacion/create`,
    {
    fecha:fecha,
    folio:folio,
    temas:temas,
    titulo:titulo,
    legajoProfesor:legajo,
    division:division,
    anio:anio,
    materia:nombreMateria
    });
  }
// ======================================================
  obtenerEvaluaciones(materiaNombre:any,legajo:any,anioNumero:any,divisionNombre){
    return this.http.get(`${this.url}/evaluacion/cargarNotas/${materiaNombre}/${legajo}/${anioNumero}/${divisionNombre}`)
    .pipe(map((data: any) =>{
      return data;
    }));
  }
// ======================================================
  cargarNotas(folio:any,notas:any){
    return this.http.post(`${this.url}/evaluacion/cargarNotas/insert`,
    {
      folioEvaluacion:folio,
      notas:notas
    });
  }
// ======================================================
  actualizarEvaluacion(folio:any){
    return this.http.put(`${this.url}/evaluacion/cargarNotas/update/${folio}`,folio)
    .pipe(map((data: any) =>{
      return data;
    }));
  }
// ======================================================
  obtenerEvaluacionesCargadas(materiaNomber:any,legajo:any,anioNumero:any,divisionNombre:any){
    return this.http.get(`${this.url}/evaluacion/todas/cargadas/${materiaNomber}/${legajo}/${anioNumero}/${divisionNombre}`)
    .pipe(map((data: any) =>{
      return data;
    }));
  }
// ======================================================
  obtenerNotasEvaluacion(folio:any){
    return this.http.get(`${this.url}/evaluacion/display/${folio}`)
    .pipe(map((data: any) =>{
      return data;
    }));
  }
// ======================================================
  obtenerEvaluacionesCargadasAlumno(legajo:any,materiaNombre:any){
   return this.http.get(`${this.url}/evaluacion/todas/alumno/${legajo}/${materiaNombre}`)
   .pipe(map((data: any) =>{
    return data;
  }));
  }
}
