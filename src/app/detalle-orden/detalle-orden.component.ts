import { Component, OnInit } from '@angular/core';
import { orden } from '../orden/orden';
import { OrdenesService } from '../orden/ordenes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.css']
})
export class DetalleOrdenComponent implements OnInit {

  id:number;
  ordenes: orden[];
  ordenesO:orden = new orden();

  constructor(private detalleService:OrdenesService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.detalleService.obtenerOrdenPorId(this.id).subscribe(dato =>{
      this.ordenesO = dato;
    },error => console.log(error));
  }

  /*private obtenerOrdenes(){
    this.detalleService.getOrdenes().subscribe(dato => {
      this.ordenes = dato;
    });
  }*/

  irOrdenes(){
    this.router.navigate(['ordenes']);
  }


}
