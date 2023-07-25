import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../_services/ordenes.service';
import { orden } from '../modelo/orden';
import { Persona } from '../modelo/persona';
import { venta } from '../venta/venta';
import { VentasService } from '../_services/ventas.service';
import { AllScriptServiceService } from '../all-script-service.service';

@Component({
  selector: 'app-generar-reporte',
  templateUrl: './generar-reporte.component.html',
  styleUrls: ['./generar-reporte.component.css']
})
export class GenerarReporteComponent implements OnInit {

  inputValueP: string = '';
  inputValue: string = '';
  id: number;
  ordenes: orden[];
  personas: Persona[];
  ventas: venta[];
  ventasb: venta[];
  ventag: venta = new venta();


  //variables de venta
  cliente: string = '';
  tipoPago: string = '';
  fecha: string = '';
  iva: number = 0;
  subtotal: number = 0;
  total: number = 0;
  //variables persona
  correop: string = '';
  direccion: string = '';
  identificacion: string = '';
  telefonop: string = "";
  //variables empresa
  nombre: string = "";
  ruc: string = "";
  telefonoe: string = "" ;
  ubicacion: string = "";
  idOrden: number;

  currentDate: string;


  constructor(private ordenesService: OrdenesService, private ventasService: VentasService, private AllScripts: AllScriptServiceService) {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    this.currentDate = `${year}-${month}-${day}`;

    AllScripts.Cargar(["default/ventanas"]);

  }

  ngOnInit(): void {
    this.obtenerDatos()
   
  }



  imprimirTabla() {
    // Oculta todo el contenido adicional que no deseas imprimir
    const contenidoAdicional: HTMLElement | null = document.querySelector('.imprime' && '.clases' && '.imprime');
    if (contenidoAdicional) {
      contenidoAdicional.style.display = 'none';
    
    }
    
    // Activar la función de impresión del navegador
    window.print();

    // Vuelve a mostrar el contenido oculto después de imprimir
    if (contenidoAdicional) {
      contenidoAdicional.style.display = 'block';
    }
    
  }
  


  buscarVentas() {
    this.ventas.splice(0, this.ventas.length);
    const valorb: string = this.inputValue;
    this.ventasService.buscarPorFecha(valorb).subscribe(dato => {
      this.ventas = dato;
      console.log(this.ventas);
    })
  }

  mostrarDetalleVenta: boolean = false; 
  
 recargar(){
  location.reload();
 }
  
  seleccionarVenta(ventaselect: venta) {
    this.ventag = ventaselect;
    this.cliente = this.ventag.personaf.nombrePer;
    this.tipoPago = this.ventag.tipoPago;
    this.fecha = this.ventag.fecha;
    this.ventag = ventaselect;
    this.cliente = this.ventag.personaf.nombrePer;
    this.tipoPago = this.ventag.tipoPago;
    this.fecha = this.ventag.fecha;
    this.iva = this.ventag.iva;
    this.subtotal = this.ventag.subtotal;
    this.total = this.ventag.total;
    this.correop = this.ventag.personaf.correo;
    this.direccion = this.ventag.personaf.direccion;
    this.identificacion = this.ventag.personaf.identificacion;
    this.telefonop = this.ventag.personaf.telefono;
    this.nombre = this.ventag.configEmpresa.nombreEmpresa;
    this.ruc = this.ventag.configEmpresa.ruc;
    this.telefonoe = this.ventag.configEmpresa.telefono;
    this.ubicacion = this.ventag.configEmpresa.ubicacion;
    this.id = this.ventag.idVenta;
    this.ordenesService.obtenerOrdenporVenta(this.id).subscribe(dato => {
      this.ordenes = dato;
    });

    this.mostrarDetalleVenta = true; 
  }

  obtenerDatos() {
    if (this.inputValueP && this.inputValue) {
      // Si se proporciona un valor para la búsqueda de persona y fecha
      const identificacion: string = this.inputValueP;
      const fecha: string = this.inputValue || this.currentDate;
      console.log(identificacion);
      console.log(fecha);

      this.ventasService.buscarPersonaVenta(identificacion, fecha).subscribe(
        datos => {
          this.ventas = datos;
          console.log(this.ventas);
        },
        error => {
          console.error('Error al obtener las ventas:', error);
          // Puedes agregar un mensaje de error o manejarlo de otra forma
        }
      );
    } else {
      // Si no se proporciona un valor para la búsqueda de persona y fecha, listar todas las ventas por fecha actual
      const valor: string = this.currentDate;
      this.ventasService.buscarPorFecha(valor).subscribe(dato => {
        this.ventas = dato;
        console.log(this.ventas);
      });
    }
  }

  
  
  

  obtenerOrdenes() {
    this.ordenesService.getOrdenes().subscribe(dato => {
      this.ordenes = dato;
    });
  }

  verificarInput(): void {
    if (this.inputValue === '') {
      this.obtenerOrdenes();
    }
  }

  verificarInputP(): void {
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
