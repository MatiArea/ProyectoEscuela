import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Url } from '../../models/url';
import { map } from 'rxjs/operators'; 
import { catchError } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root'
})
export class ColegioService {

  constructor( public http:HttpClient ) { }

  url=Url;

// ======================================================
  obtenerAnios(){

    return this.http.get(`${this.url}/colegio/anios/divisiones`)
    .pipe(map((data: any) =>{
      return data;
    }));
 
   }
// ======================================================
  obtenerDivisiones(numero:any){

    return this.http.get(`${this.url}/colegio/divisiones/${numero}`)
    .pipe(map((data: any) =>{
      return data;
    }));
 
   }
// ======================================================
   obtenerAlumnos(codigo:any){

    return this.http.get(`${this.url}/colegio/alumnos/${codigo}`)
    .pipe(map((data: any) =>{
      return data;
    }));
 
   }
// ======================================================
  obtenerMateriasProfesor(legajo){

    return this.http.get(`${this.url}/colegio/profesor/materias/${legajo}`)
    .pipe(map((data: any) =>{
      return data;
    }));
  }
// ======================================================
   obtenerAlumnosPorAnioYDiv(anioNumero:any,divisionNombre){
    return this.http.get(`${this.url}/colegio/alumnos/${anioNumero}/${divisionNombre}`)
    .pipe(map((data: any) =>{
      return data;
    }));
   }
// ======================================================
   obtenerMateriasAlumno(legajo:any){
    return this.http.get(`${this.url}/colegio/alumno/materias/${legajo}`)
    .pipe(map((data: any) =>{
      return data;
    }));
   }
// ======================================================
   obtenerCursoAlumno(legajo:any){
    return this.http.get(`${this.url}/colegio/alumno/curso/${legajo}`)
    .pipe(map((data: any) =>{
      return data;
    }));
   }
}
