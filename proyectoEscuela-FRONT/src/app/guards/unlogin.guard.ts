import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnloginGuard implements CanActivate {
  
  constructor( private rotuer:Router ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
      if ( localStorage.getItem( 'email' ) === null ) {
        return true;
      } else {
        this.rotuer.navigate(['paneladmin']);
        return false;
      }
  }
}
