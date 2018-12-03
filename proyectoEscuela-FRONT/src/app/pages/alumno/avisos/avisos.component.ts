import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.css']
})
export class AvisosComponent implements OnInit {

  constructor() { }

  avisos:any[] =[
    {fecha:'30/11/18',descripcion:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora excepturi vitae aliquam quas vel blanditiis fugiat eaque dicta minima amet. In optio magni, nobis excepturi perspiciatis quisquam repellat quod doloribus culpa illum volup'},
    {fecha:'20/11/18',descripcion:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora excepturi vitae aliquam quas vel blanditiis fugiat eaque dicta minima amet. In optio magni, nobis excepturi perspiciatis quisquam repellat quod doloribus culpa illum volup'},   
   
  ];

  ngOnInit() {
  }

}
