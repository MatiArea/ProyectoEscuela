import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paneladmin',
  templateUrl: './paneladmin.component.html',
  styleUrls: ['./paneladmin.component.css']
})
export class PaneladminComponent implements OnInit {

  constructor() { }


  mostrar1= false;
  mostrar2= false;
  mostrar3= false;
  mostrar4= false;
  ngOnInit() {
  }

  verificarPreceptor() {

    if ( localStorage.getItem( 'rol' ) === 'Profesor' ) {
    return false;  
    } else {
      return true;
    }
  
}


verificarProfesor() {

  if ( localStorage.getItem( 'rol' ) === 'Preceptor' ) {
  return false;  
  } else {
    return true;
  }

}

}
