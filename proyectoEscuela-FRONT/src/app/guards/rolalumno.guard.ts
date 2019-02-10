import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolAlumno implements CanActivate {

  constructor( private rotuer:Router ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      if ( localStorage.getItem( 'rol' ) === 'Alumno' ) {
        return true;
        
      } else {
        this.rotuer.navigate(['error']);
        return false;
      }
  }
}
