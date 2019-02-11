import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-enviarnotificacion',
  templateUrl: './enviarnotificacion.component.html',
  styleUrls: ['./enviarnotificacion.component.css']
})
export class EnviarnotificacionComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  enviarnot( not:NgForm ) {
    console.log(not.value);
  }

}
