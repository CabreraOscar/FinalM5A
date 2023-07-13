import { Component, OnInit } from '@angular/core';
import { venta } from '../venta/venta';
import { Persona } from '../modelo/persona';
import { Empresa } from '../empresa';
import { VentasService } from '../venta/ventas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css']
})
export class DetalleVentaComponent implements OnInit {
  ventas: venta[];
  personas: Persona[];
  empresas: Empresa[];

  constructor(private detalleService:VentasService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerventa();
  }

  private obtenerventa(){
    this.detalleService.mostrarDetalle().subscribe(dato => {
      this.ventas = dato;
    });
  }

  irventas(){
    this.router.navigate(['ventas']);
  }
}
