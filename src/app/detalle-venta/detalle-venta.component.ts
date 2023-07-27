import { Component, OnInit } from '@angular/core';
import { venta } from '../venta/venta';
// import { Persona } from '../modelo/persona';
// import { Empresa } from '../modelo/empresa';
import { VentasService } from '../_services/ventas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css']
})
export class DetalleVentaComponent implements OnInit {
  id: number;
  //  personas: Persona[];
  // empresas: Empresa[];
  ventas: venta[];
  ventasL: venta = new venta();

  constructor(private auth:AuthService, private detalleService:VentasService, private router: Router, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let idRol=localStorage.getItem('idRol') ?? ''
  if(idRol!=''){
    if(idRol==='1'){
         
    }else{
     this.auth.canAuthenticate();
    }
  }
    this.id = this.route.snapshot.params['id'];
    this.detalleService.obtenerventaPorId(this.id).subscribe(dato =>{
      this.ventasL = dato;
    },error => console.log(error));
  }

  //  private obtenerventa(){
  //    this.id = this.route.snapshot.params['id'];
  //  this.detalleService.mostrarDetalle().subscribe(dato => {
    
  //    },error => console.log(error));
  // }

  irventas(){
    this.router.navigate(['ventas']);
  }
}
