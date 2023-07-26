import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../_services/ordenes.service';
import { orden } from '../modelo/orden';
import { Router } from '@angular/router';
import { Persona } from '../modelo/persona';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-pantalla-empleado',
  templateUrl: './pantalla-empleado.component.html',
  styleUrls: ['./pantalla-empleado.component.css']
})
export class PantallaEmpleadoComponent implements OnInit {
orden:orden=new orden();
ordenx:orden=new orden();
persona:Persona=new Persona();
ordenlista:orden[]=[];
idordenultimo:number;
integrador:number;

  constructor(private auth: AuthService, private ordenesService: OrdenesService,private router:Router) {
    }

  ngOnInit(): void {
 
    this.auth.canAuthenticate();
  }

 
/*
  CrearOrden(){
    this.obtenerOrdeneslista();
    this.ordenesService.registrarorden(this.orden).subscribe(dato =>{
      console.log(dato);

      this.integrador=this.ordenlista.length;
      this.integrador=this.integrador + 1;
      
      this.ordenx=this.ordenlista[this.integrador];
      this.idordenultimo=this.obtenerUltimoId();
      this.idordenultimo=this.idordenultimo + 1;
      console.log(this.idordenultimo);
      this.irAlapaginaempleados();
    },error => console.log(error)); 
  }
  */

  irAlapaginaempleados(){
    this.router.navigate(['/detalleorden'])
  }

  Ventas(){
    this.router.navigate(['/generar-ventas'])
  }

  public obtenerUltimoId(): number {
    if (this.ordenlista.length > 0) {
      const ultimoObjeto = this.ordenlista[this.ordenlista.length - 1];
      return ultimoObjeto.idOrden;
    }
    return 0;
  }

  obtenerOrdeneslista(){
    this.ordenesService.getOrdenes().subscribe(dato => {
  this.ordenlista=dato;
    });
  
    }
    informaciones(): void {
      this.router.navigate(['/informacion'])
    }
    Venta(): void {
      this.router.navigate(['/generar-reporte'])
    }
}
