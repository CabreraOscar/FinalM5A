import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../_services/ordenes.service';
import { orden } from '../modelo/orden';
import { personaService } from '../_services/persona.service';
import { Persona } from '../modelo/persona';
import { EmpresaService } from '../_services/empresa.service';
import { Empresa } from '../modelo/empresa';

@Component({
  selector: 'app-generar-ventas',
  templateUrl: './generar-ventas.component.html',
  styleUrls: ['./generar-ventas.component.css']
})
export class GenerarVentasComponent implements OnInit {

  inputValue: string = '';
  inputValueP:string = '';
  ordenesV: orden[];
  listaPersona: Persona[];
  personaOrden: Persona = new Persona();
  personax: Persona = new Persona();
  ordenSelect: orden = new orden();
  cedulaV: string = '';
  clienteV: string = '';
  totalOrdenV: number;
  descuentonumero: number = 0;
  fechaActual: string;
  tipoPagoSeleccionado: string;
  constructor(private empresaServicio:EmpresaService,private ordenService: OrdenesService, private personaService: personaService) { }
  empresas2: string[] = ['LAVAFLASH (SAYAUSI)'];
  empresaSeleccionada: Empresa;
  descuento: string = 'no'; // Valor predeterminado a 'no'
  descuentoSeleccionado: string = ''; // Variable para almacenar el descuento seleccionado
  empresas: Empresa[] = [];
  


  ngOnInit(): void {
    this.obtenerOrden();
    this.obtenerPersona();
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = ('0' + (hoy.getMonth() + 1)).slice(-2); // Agrega cero a meses de un solo dígito
    const day = ('0' + hoy.getDate()).slice(-2); // Agrega cero a días de un solo dígito
    this.fechaActual = `${year}-${month}-${day}`;
    this.tipoPagoSeleccionado = 'efectivo';
    this.actualizarDescuentoNumero();
    this.obtenerEmpresa();
    
  }

  compareEmpresa(e1: Empresa, e2: Empresa): boolean {
    return e1 && e2 ? e1.idConfig === e2.idConfig : e1 === e2;
  }
  actualizarDescuento(event: Event) {
    this.descuento = (event.target as HTMLInputElement).value;
    this.actualizarDescuentoNumero();
  }
  actualizarDescuentoNo() {
    this.descuentoSeleccionado = 'sin descuento';
    this.actualizarDescuentoNumero();
  }
  actualizarDescuentoNumero() {
    switch (this.descuentoSeleccionado) {
      case 'secado gratis':
        this.descuentonumero = 0.10;
        break;
      case 'productos gratis':
        this.descuentonumero = 0.15;
        break;
      case 'doblado gratis':
        this.descuentonumero = 0.14;
        break;
      default:
        this.descuentonumero = 0;
        break;
    }
  }
  seleccionarEmpresa() {
    // La variable 'empresaSeleccionada' se actualizará automáticamente al seleccionar una opción en el combobox
    console.log('Empresa seleccionada:', this.empresaSeleccionada);
  }
crearventa(){
  console.log(this.empresaSeleccionada);

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

  private obtenerEmpresa(){
    this.empresaServicio.obtenerListaDeEmpresa().subscribe(dato => {
      this.empresas = dato;
      this.empresaSeleccionada = Object.assign({}, this.empresas[0]);
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
    
    this.personaService.obtenerPersonaPoridentificacion(this.inputValueP).subscribe(dato => {
      this.personax = dato;
      this.listaPersona.splice(0, this.listaPersona.length);
      this.listaPersona.push(this.personax);
      console.log(this.listaPersona.length);
    });

  }



  verificarInput(): void {
    if (this.inputValue === '') {
      this.obtenerOrden();
    }
  }

  verificarInputP(): void {
    if (this.inputValue === '') {
      this.obtenerPersona();
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
