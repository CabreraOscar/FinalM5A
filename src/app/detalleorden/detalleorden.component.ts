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
  detalles:detalleorden
  detalleso:detalleorden = new detalleorden();
  detalleorden: detalleorden[];
  constructor(private detalleordenService:DetalleordenService) { }

  ngOnInit(): void {
    this.obtenerdetalleorden();
    this.obtenerdetalleorden1();
    this.obtenerdetalleorden2();
    
    

  }
  private obtenerdetalleorden(){
    this.detalleordenService.obtenerListadetalleorden().subscribe(dato => {
      this.detalleorden = dato;
    });
  }

  private obtenerdetalleorden1(){
    this.detalleordenService.obtenerListadetalleorden1().subscribe(dato => {
      this.detalleorden = dato;
    });
  }

  private obtenerdetalleorden2(){
    this.detalleordenService.obtenerListadetalleorden2().subscribe(dato => {
      this.detalleorden = dato;
    });
  }


}
