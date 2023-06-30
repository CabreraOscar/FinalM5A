import { Component, OnInit } from '@angular/core';
import { orden } from './orden';
import Swal from 'sweetalert2';
import { OrdenesService } from './ordenes.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent {

  ordenes: orden[]=[];
  constructor(private ordenesService: OrdenesService){}
  ngOnInit(): void {

   this.ordenesService.getOrdenes().subscribe(
ordenes=> this.ordenes=ordenes
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
      if (result.value) {this.ordenesService.eliminarC(id).subscribe(ordenes => { this.ordenesService.getOrdenes().subscribe(response => this.ordenes = response )
   Swal.fire(
           'Orden a sido eliminada'
   )}) } })}}
  /*
   ordenes: orden[]=[
    {id_orden: 1, estado:1, total_orden:4, id_factura:1, id_persona:1},
      {id_orden: 2, estado:1, total_orden:4, id_factura:1, id_persona:1},
    ];
    constructor(){}
    ngOnInit(): void {
  
    }}
    */