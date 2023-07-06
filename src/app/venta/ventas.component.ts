import { Component, OnInit } from '@angular/core';
import { venta } from './venta';
import { VentasService } from './ventas.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  mostrarDatos: boolean;

  idVenta: number ;
  fecha: Date ;
  tipoPago: string = '';
  subtotal:  number ;
  descuento:  number ;
  iva:  number ;
  total:  number ;
  personaf:  number ;
  configEmpresa:  number ;

  ventas: venta[] = [];

  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.ventasService.mostrarDetalle().subscribe(
      ventas => this.ventas = ventas
    );
  }

  mmostrarDatos(): void {
    this.mostrarDatos = !this.mostrarDatos;
  }
    
  }
  