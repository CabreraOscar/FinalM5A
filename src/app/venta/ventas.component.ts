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
  ventas: venta[]=[];
  constructor(private ventasService: VentasService){}
  ngOnInit(): void {

   this.ventasService.getVentas().subscribe(
    ventas=> this.ventas=ventas
   );
  }
  eliminarC(id:number){ 
    Swal.fire({
      title: '¿Deseas eliminar?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#FFC0CB',
      cancelButtonColor: '#FF0000',
      confirmButtonText: 'SI',
      cancelButtonText: 'NO',
      buttonsStyling: true
    }).then((result) => {
      if (result.value) {this.ventasService.eliminarC(id).subscribe(ordenes => { this.ventasService.getVentas().subscribe(response => this.ventas = response )
   Swal.fire(
           'venta a sido eliminada'
        )}) } })}}
