import { Component, OnInit } from '@angular/core';
import { orden } from './orden';
import Swal from 'sweetalert2';
import { OrdenesService } from './ordenes.service';
import { Persona } from '../modelo/persona';
import { venta } from '../venta/venta';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-ordenes',
  templateUrl:'./ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent {

  ordenes: orden[];
  personas: Persona[];
  ventas: venta[];
  constructor(private ordenesService: OrdenesService, private router:Router) { }
  ngOnInit(): void {
    this.obtenerOrdenes();

  }

  private obtenerOrdenes(){
    this.ordenesService.getOrdenes().subscribe(dato => {
      this.ordenes = dato;
    });
  }

  irOrden(){
    this.router.navigate(['detalles-ordenes']);
  }

}