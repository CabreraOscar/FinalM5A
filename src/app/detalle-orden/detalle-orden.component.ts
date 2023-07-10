import { Component, OnInit } from '@angular/core';
import { orden } from '../orden/orden';
import { Persona } from '../modelo/persona';
import { venta } from '../venta/venta';
import { OrdenesService } from '../orden/ordenes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.css']
})
export class DetalleOrdenComponent implements OnInit {

  ordenes: orden[];
  personas: Persona[];
  ventas: venta[];

  constructor(private detalleService:OrdenesService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerOrdenes();
  }

  private obtenerOrdenes(){
    this.detalleService.getOrdenes().subscribe(dato => {
      this.ordenes = dato;
    });
  }

  irOrdenes(){
    this.router.navigate(['ordenes']);
  }
}
