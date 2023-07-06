import { Component, OnInit } from '@angular/core';
import { detalleorden } from './detalleorden';
import { DetalleordenService } from './detalleorden.service';

@Component({
  selector: 'app-detalleorden',
  templateUrl: './detalleorden.component.html',
  styleUrls: ['./detalleorden.component.css']
})
//obtenerListadetalleorden
export class DetalleordenComponent implements OnInit {
  detalleorden: detalleorden[];
  detalleso:detalleorden = new detalleorden();
 
  constructor(private detalleordenService:DetalleordenService) { }

  ngOnInit(): void {
    this.obtenerdetalleorden();
   
    
    

  }
  private obtenerdetalleorden(){
    this.detalleordenService.obtenerListadetalleorden().subscribe(dato => {
      this.detalleorden = dato;
    });
  }

  
  guardardetalle(){
    this.detalleordenService.registrarorden(this.detalleso).subscribe(dato =>{
      console.log(dato);
      this.obtenerdetalleorden();

    },error => console.log(error));
  }


}
