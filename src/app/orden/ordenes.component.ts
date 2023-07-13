import { Component, OnInit } from '@angular/core';
import { orden } from './orden';
import Swal from 'sweetalert2';
import { OrdenesService } from './ordenes.service';
import { Persona } from '../modelo/persona';
import { venta } from '../venta/venta';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AllScriptServiceService } from '../all-script-service.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {

  inputValue: string = '';
  id: number;
  ordenes: orden[];
  //ordenesb: orden[];
  personas: Persona[];
  ventas: venta[];
  ordenesO: orden = new orden;
  constructor(private ordenesService: OrdenesService, private router: Router, private route: ActivatedRoute, private AllScripts: AllScriptServiceService) {
    AllScripts.Cargar(["default/ventanas"]);
  }
  ngOnInit(): void {
    this.obtenerOrdenes();

  }

  obtenerOrdenes() {
    this.ordenesService.getOrdenes().subscribe(dato => {
      this.ordenes = dato;
    });
  }


  verOrden(id: number) {
    this.router.navigate(['detalles-ordenes', id]);
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

}