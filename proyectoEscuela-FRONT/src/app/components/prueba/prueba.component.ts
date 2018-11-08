import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  constructor( private http:HttpClient ) { 
  }

  ngOnInit() {
  }

  prueba () {

    this.http.get('https://restcountries.eu/rest/v2/lang/es')
      .subscribe( data => {
        console.log( data );
      } )

  }

}
