import { Component, OnInit } from '@angular/core';
import { venta } from './venta';
import { VentasService } from '../_services/ventas.service';
import Swal from 'sweetalert2';
import { Persona } from '../modelo/persona';
import { Empresa } from '../modelo/empresa';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AllScriptServiceService } from '../all-script-service.service';
@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']

})
export class VentasComponent implements OnInit {
  inputValue: string = '';
  id: number;

 
  personas: Persona[];
  empresas: Empresa[];

  
 ventas: venta[];
 ventasL: venta = new venta;
  constructor(private ventasService: VentasService, private router:Router, private datePipe: DatePipe, private route: ActivatedRoute, private AllScripts: AllScriptServiceService) {
    AllScripts.Cargar(["default/ventanas"]);
  }

  
   ngOnInit(): void {
    this.obtenerventa();
  }
  
  private obtenerventa(){
    this.ventasService.mostrarDetalle().subscribe(dato => {
      this.ventas = dato;
    });
  }

  
  verVenta(id: number){
    this.router.navigate(['detalles-venta', id]);
  }
  buscarPorFechas() {
    this.ventas.splice(0, this.ventas.length);
    const valor: string = this.inputValue;
    this.ventasService.buscarPorFecha(valor).subscribe(dato => {
      this.ventas = dato;
    });

  }
  verificarInput(): void {
    if (this.inputValue === '') {
      this.obtenerventa();
    }
  }

 
}
