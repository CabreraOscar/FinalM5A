import { Component, NgModule, OnInit } from '@angular/core';
import { detalleorden } from './detalleorden';
import { DetalleordenService } from './detalleorden.service';
@Component({
  selector: 'app-detalleorden',
  templateUrl: './detalleorden.component.html',
  styleUrls: ['./detalleorden.component.css']
})
//obtenerListadetalleorden
export class DetalleordenComponent implements OnInit {
 
  //VARIABLES Y ARRAYS
  detalleorden: detalleorden[];
  detalleso:detalleorden = new detalleorden();
  currentDate: string;
 suan:number=16;
 //FIN DE VARIABLES Y ARRAYS
  constructor(private detalleordenService:DetalleordenService) {   const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    this.currentDate = `${year}-${month}-${day}`;}

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
