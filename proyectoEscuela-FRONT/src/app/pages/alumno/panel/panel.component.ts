import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

  constructor() { }

 
  mostrar1= false;
  mostrar2= false;
  mostrar3= false;
  variable:any;
  icono='fa-bars';

  
  ngOnInit() {
  }

  cambiar(){
    this.variable= document.getElementById('barra-lateral').style.display;
    console.log(this.variable);
    if (  this.variable === 'none' || this.variable ==='' ) {
      document.getElementById('barra-lateral').style.display = 'inline';
      document.getElementById('index3').style.position = 'absolute';
      document.getElementById('index3').style.zIndex = '3';
      document.getElementById('index3').style.background = 'rgba(0, 0, 0, 0.548)';
      this.icono='fa-times';


    }else{
      document.getElementById('barra-lateral').style.display = 'none';
      document.getElementById('index3').style.position = 'relative';
      document.getElementById('index3').style.zIndex = 'none';
      document.getElementById('index3').style.background = 'none';
      this.icono='fa-bars';

    }
  }

}
