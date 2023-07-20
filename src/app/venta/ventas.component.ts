import { Component, OnInit } from '@angular/core';
import { venta } from './venta';
import { VentasService } from '../_services/ventas.service';
import Swal from 'sweetalert2';
import { Persona } from '../modelo/persona';
import { Empresa } from '../modelo/empresa';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AllScriptServiceService } from '../all-script-service.service';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']

})
export class VentasComponent implements OnInit {
  inputValue: string = '';
  id: number;

 
  personas: Persona[];
  empresas: Empresa[];

  
 ventas: venta[];
 ventasL: venta = new venta;
 fechaInicio: string = '';
 fechaFin: string = '';
 total: number = 0;
  constructor(private ventasService: VentasService, private router:Router, private datePipe: DatePipe, private route: ActivatedRoute, private AllScripts: AllScriptServiceService) {
    AllScripts.Cargar(["default/ventanas"]);
  }

  
   ngOnInit(): void {
    this.obtenerventa();
  }
  
   obtenerventa(){
    this.ventasService.mostrarDetalle().subscribe(dato => {
      this.ventas = dato;
    });
  }

  
  verVenta(id: number){
    this.router.navigate(['detalles-venta', id]);
  }

  buscarPorFechas() {
    // Filtra las ventas que estén dentro del rango de fechas.
    this.ventas = this.ventas.filter(venta => {
      const fechaVenta: String = new String(venta.fecha);
  
      // Devuelve true si la fecha de la venta está dentro del rango especificado.
      return fechaVenta >= this.fechaInicio && fechaVenta <= this.fechaFin;
       });
       const ventas = this.ventas.filter(venta => {
        return venta.fecha >= this.fechaInicio && venta.fecha <= this.fechaFin;
      });
  
      this.total = ventas.reduce((a, b) => a + b.total, 0);
      
    }
    limpiarYRecargar() {
      // Implement the logic to clear the date fields and reload the page.
      this.fechaInicio = '';
      this.fechaFin = '';
      this.total = 0;
  
      // Reload the page using JavaScript's location.reload() method.
      window.location.reload();
    }
 
  verificarInput(): void {
    if (this.inputValue === '') {
      this.obtenerventa();
    }
  }

 
}
