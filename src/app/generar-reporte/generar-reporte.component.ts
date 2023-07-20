import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../_services/ordenes.service';
import { orden } from '../modelo/orden';
import { Persona } from '../modelo/persona';
import { venta } from '../venta/venta';
import { VentasService } from '../_services/ventas.service';

@Component({
  selector: 'app-generar-reporte',
  templateUrl: './generar-reporte.component.html',
  styleUrls: ['./generar-reporte.component.css']
})
export class GenerarReporteComponent implements OnInit {

  inputValue: string = '';
  id: number;
  ordenes: orden[];
  personas: Persona[];
  ventas: venta[];
  ventasb: venta[];
  
  currentDate: string;


  constructor(private ordenesService:OrdenesService, private ventasService: VentasService) { const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    this.currentDate = `${year}-${month}-${day}`;

   }

  ngOnInit(): void {
    this.listarFecha();
  }



  listarFecha(){
    const valor: string = this.currentDate;
    this.ventasService.buscarPorFecha(valor).subscribe(dato => {
      this.ventas = dato;
      console.log(this.ventas);
    });
  }

  buscarVentas(){
    this.ventas.splice(0, this.ventas.length);
    const valorb: string = this.inputValue;
    this.ventasService.buscarPorFecha(valorb).subscribe(dato =>{
      this.ventas = dato;
      console.log(this.ventas);
    })
  }

  obtenerOrdenes() {
    this.ordenesService.getOrdenes().subscribe(dato => {
      this.ordenes = dato;
    });
  }

  verificarInput(): void {
    if (this.inputValue === '') {
      this.obtenerOrdenes();
    }
  }


  


  obtenerTextoEstado(estado: number): string {
    switch (estado) {
      case 0:
        return 'Pendiente';
      case 1:
        return 'Entregado';
      default:
        return 'Desconocido';
    }
  }


}
