import { Component, OnInit } from '@angular/core';
import { orden } from '../modelo/orden';
import Swal from 'sweetalert2';
import { OrdenesService } from '../_services/ordenes.service';
import { Persona } from '../modelo/persona';
import { venta } from '../venta/venta';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AllScriptServiceService } from '../all-script-service.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {

  inputValue: string = '';
  id: number;
  ordenes: orden[];
  personas: Persona[];
  ventas: venta[];
  ordenesO: orden = new orden;
 
  constructor(private auth:AuthService, private ordenesService: OrdenesService, private router: Router, private route: ActivatedRoute, private AllScripts: AllScriptServiceService) {
    AllScripts.Cargar(["default/ventanas"]);
  }
  ngOnInit(): void {
    this.obtenerOrdenes();
    let idRol=localStorage.getItem('idRol') ?? ''
  if(idRol!=''){
    if(idRol==='1'){
         
    }else{
     this.auth.canAuthenticate();
    }
  }
  }

  obtenerOrdenes() {
    this.ordenesService.getOrdenes().subscribe(dato => {
      this.ordenes = dato;
      
    });
  }
  limpiarYRecargar() {
    // Implement the logic to clear the date fields and reload the page.
    this.inputValue = '';
   

    // Reload the page using JavaScript's location.reload() method.
    window.location.reload();
  }


  verOrden(id: number) {
    this.router.navigate(['detalle-orden',id]);
  }

  buscarporcedula() {
    this.ordenes.splice(0, this.ordenes.length);
    const valor: string = this.inputValue;
    this.ordenesService.obtenerPersonaPoridentificacion(valor).subscribe(dato => {
      this.ordenes = dato;
    
    });

  }

  verificarInput(): void {
    if (this.inputValue === '') {
      this.obtenerOrdenes();
    }
  }

  obtenerTextoEstado(estado: number): string {
    switch (estado) {
      case 0:
        return 'Pendiente';
      case 1:
        return 'Entregado';
      default:
        return 'Desconocido';
    }
  }
  

}