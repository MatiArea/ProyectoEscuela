import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barrainferior',
  templateUrl: './barrainferior.component.html',
  styleUrls: ['./barrainferior.component.css']
})
export class BarrainferiorComponent implements OnInit {

  constructor( private router:Router ) { }

  ngOnInit() {
  }

  unlogin() {
    localStorage.clear();
    this.router.navigate(['login']);

  }
}
