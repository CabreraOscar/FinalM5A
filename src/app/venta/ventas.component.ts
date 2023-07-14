import { Component, OnInit } from '@angular/core';
import { venta } from './venta';
import { VentasService } from '../_services/ventas.service';
import Swal from 'sweetalert2';
import { Persona } from '../modelo/persona';
import { Empresa } from '../modelo/empresa';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']

})
export class VentasComponent implements OnInit {
 
  anio: number;
  mes: number;
  dia: number;
 
  fechaBusqueda: string;
  personas: Persona[];
  empresas: Empresa[];

  
 ventas: any[];

  http: any;
;
 

  constructor(private ventasService: VentasService, private router:Router, private datePipe: DatePipe) {   
   }

  
   ngOnInit(): void {
    this.obtenerventa();
  }
  
  private obtenerventa(){
    this.ventasService.mostrarDetalle().subscribe(dato => {
      this.ventas = dato;
    });
  }
  
  irventas(){
    this.router.navigate(['detalles-venta']);
  }
  
  buscarPorFecha() {
   const fecha = new Date(this.fechaBusqueda);
    if (!this.fechaBusqueda) {
      console.error('Fecha inválida');
      return;
    }

    this.ventas = this.ventas.filter(venta => venta.fecha === this.fechaBusqueda);


    const fechaSinHora = new Date(this.fechaBusqueda).toISOString().slice(0, 10);
    this.ventas= this.ventas.filter(venta => venta.fecha.slice(0, 10) === fechaSinHora);
    const fechaFormateada = this.datePipe.transform(fecha, 'yyyy-MM-dd');
    const endpoint = `/buscar?fecha=${fechaFormateada}`;
    this.http.get(endpoint).subscribe(
      (respuesta: any[]) => {
        console.log(respuesta);
        if (Array.isArray(respuesta)) {
          this.ventas = [...respuesta]; // Almacenar las ventas filtradas en "ventasFiltradas"
        } else {
          console.error('Formato de respuesta inválido');
        }
      },
      (error: any) => {
        console.error(error);
        alert('No se pudo realizar la búsqueda');
      }
    );
  }

 
}
