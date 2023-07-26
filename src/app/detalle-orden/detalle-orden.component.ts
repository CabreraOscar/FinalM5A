import { Component, OnInit } from '@angular/core';
import { orden } from '../modelo/orden';
import { OrdenesService } from '../_services/ordenes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-detalle-orden',
  templateUrl: './detalle-orden.component.html',
  styleUrls: ['./detalle-orden.component.css']
})
export class DetalleOrdenComponent implements OnInit {

  id:number;
  ordenes: orden[];
  ordenesO:orden = new orden();

  constructor(private auth:AuthService,private detalleService:OrdenesService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.detalleService.obtenerOrdenPorId(this.id).subscribe(dato =>{
      this.ordenesO = dato;
    },error => console.log(error));
    this.auth.canAuthenticate();
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
