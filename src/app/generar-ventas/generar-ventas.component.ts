import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../_services/ordenes.service';
import { orden } from '../modelo/orden';
import { personaService } from '../_services/persona.service';
import { Persona } from '../modelo/persona';

@Component({
  selector: 'app-generar-ventas',
  templateUrl: './generar-ventas.component.html',
  styleUrls: ['./generar-ventas.component.css']
})
export class GenerarVentasComponent implements OnInit {

  inputValue: string = '';
  inputValueP: string = '';
  ordenesV: orden[];
  listaPersona: Persona[];
  personaOrden: Persona = new Persona();
  personax: Persona = new Persona();
  ordenSelect: orden = new orden();
  cedulaV: string = '';
  clienteV: string = '';
  totalOrdenV: number;


  constructor(private ordenService: OrdenesService, private personaService: personaService) { }

  ngOnInit(): void {
    this.obtenerOrden();
    this.obtenerPersona();
  }

  obtenerOrden() {
    this.ordenService.getOrdenesNull().subscribe(dato => {
      this.ordenesV = dato;

      console.log(dato);
    });
  }

  obtenerPersona() {
    this.personaService.obtenerListaPersona().subscribe(dato => {
      this.listaPersona = dato;
      console.log(dato);
    });
  }


  buscarVentaPorCedula() {
    this.ordenesV.splice(0, this.ordenesV.length);
    const valor: string = this.inputValue;
    this.ordenService.obtenerPersonaPoridentificacion(valor).subscribe(dato => {
      this.ordenesV = dato;
    });

  }

  buscarPersonaPorcedula() {
    const valor: string = this.inputValueP;
    this.personaService.obtenerPersonaPoridentificacion(valor).subscribe(dato => {
      this.personax = dato;
      this.listaPersona.splice(0, this.listaPersona.length);
      this.listaPersona.push(this.personax);
    });

  }



  verificarInput(): void {
    if (this.inputValue === '') {
      this.obtenerOrden();
    }
  }
  ordenesSeleccionadas: orden[] = [];

  seleccionarPersona(ordenselect: Persona) {
    this.personaOrden = ordenselect;
    this.cedulaV = this.personaOrden.identificacion;
    this.clienteV = this.personaOrden.nombrePer;
    console.log(this.personaOrden.nombrePer);
  }


  seleccionarOrden(ordenes: orden) {
    this.ordenSelect = ordenes;
    this.totalOrdenV = this.ordenSelect.totalOrden;
    if (this.ordenesSeleccionadas.includes(ordenes)) {
      this.ordenesSeleccionadas = this.ordenesSeleccionadas.filter(item => item !== ordenes);
    } else {
      this.ordenesSeleccionadas.push(ordenes);
    }
  }


  // Cambiar de numero a el nombre del estado
  obtenerTextoEstado(estado: number): string {
    switch (estado) {
      case 0:
        return 'Pendiente';
      case 1:
        return 'En proceso';
      case 2:
        return 'Listo';
      case 3:
        return 'Entregado';
      default:
        return 'Desconocido';
    }
  }



}
