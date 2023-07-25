import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../_services/ordenes.service';
import { orden } from '../modelo/orden';
import { personaService } from '../_services/persona.service';
import { Persona } from '../modelo/persona';
import { EmpresaService } from '../_services/empresa.service';
import { Empresa } from '../modelo/empresa';
import { venta } from '../venta/venta';
import { VentasService } from '../_services/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-ventas',
  templateUrl: './generar-ventas.component.html',
  styleUrls: ['./generar-ventas.component.css']
})
export class GenerarVentasComponent implements OnInit {
  botonSeleccionado = false;
  inputValue: string = '';
  inputValueP:string = '';
  ordenesV: orden[];
  listaPersona: Persona[];
  personaOrden: Persona = new Persona();
  personax: Persona = new Persona();
  ordenSelect: orden | null = null;
  cedulaV: string = '';
  clienteV: string = '';
  totalOrdenV: number;
  descuentonumero: number = 0;
  fechaActual: string;
  tipoPagoSeleccionado: string;
  constructor(private ventaServicio: VentasService,private empresaServicio:EmpresaService,private ordenService: OrdenesService, private personaService: personaService) { }
  botonesSeleccionados: { [key: number]: boolean } = {};
  empresaSeleccionada: Empresa;
  descuento: string = 'no'; // Valor predeterminado a 'no'
  descuentoSeleccionado: string = ''; // Variable para almacenar el descuento seleccionado
  empresas: Empresa[] = [];
  ordenesSeleccionadas: orden[] = [];
  sumaTotalOrden: number= 0;
  finalin: number= 0;
  ventacreada: venta = new venta();

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
    this.calculartotalsubivades();
  }
  actualizarDescuentoNumero() {
    switch (this.descuentoSeleccionado) {
      case 'secado gratis':
        this.descuentonumero = 0.10;
        this.calculartotalsubivades();
        break;
      case 'productos gratis':
        this.descuentonumero = 0.15;
        this.calculartotalsubivades();
        break;
      case 'doblado gratis':
        this.descuentonumero = 0.14;
        this.calculartotalsubivades();
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
  console.log(this.personaOrden);
  console.log(this.tipoPagoSeleccionado);
  console.log(this.fechaActual);
  console.log(this.sumaTotalOrden);
  console.log(this.empresaSeleccionada.iva);
  console.log(this.descuentonumero);


  if (this.cedulaV.trim() === '' || this.clienteV.trim() === '' || this.sumaTotalOrden === 0) {
    Swal.fire('FALTAN DATOS PARA GENERAR LA VENTA', '', 'warning');

  } else{

  this.ventacreada.fecha=this.fechaActual;
  this.ventacreada.iva=this.empresaSeleccionada.iva;
  this.ventacreada.subtotal=this.sumaTotalOrden;
  this.ventacreada.descuento=this.descuentonumero;
  this.ventacreada.tipoPago=this.tipoPagoSeleccionado;
  this.ventacreada.personaf=this.personaOrden;
  this.ventacreada.configEmpresa=this.empresaSeleccionada;

  this.ventaServicio.crearventaid(this.ventacreada).subscribe(
    (idVentaCreada) => {
      // Aquí recibes el ID de la venta creada desde el servidor
      this.ventaServicio.obtenerventaPorId(idVentaCreada).subscribe(
        venta => {
          console.log(orden);
          for (const orden of this.ordenesSeleccionadas) {
            if (!orden.venta) {
              orden.estado=1;
              orden.venta = venta;
              this.actualizarOrdenEnBackend(orden.idOrden, orden); // Pasamos el objeto 'item' completo
            }
          }

        },
        error => {
          console.error('Error al obtener la orden:', error);
          // Maneja el error aquí si es necesario
        }
      );
      //aqui va el codigo para setear las ordenes
     
    },
    (error) => {
      // Manejo de errores en caso de que ocurra algún problema al enviar la venta
      console.error('Error al crear la venta:', error);
    }
  );

Swal.fire('TODO CORRECTO', '', 'success').then(() => {
  // Recargar la página después de que el usuario hace clic en el botón "Aceptar" de la alerta
  window.location.reload();
});

}//finaliza el else
}

actualizarOrdenEnBackend(idorden: number, orden: orden) {
  this.ordenService.actualizarorden(idorden, orden).subscribe(
    itemActualizado => {
      console.log('Item actualizado en el backend:', itemActualizado);
    },
    error => {
      console.error('Error al actualizar el item en el backend:', error);
      // Maneja el error aquí si es necesario
    }
  );
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
  

  seleccionarPersona(ordenselect: Persona) {
    this.personaOrden = ordenselect;
    this.cedulaV = this.personaOrden.identificacion;
    this.clienteV = this.personaOrden.nombrePer;
    console.log(this.personaOrden.nombrePer);
  }


  seleccionarOrden(ordenes: orden) {
    this.ordenSelect = ordenes;
    
    if (this.ordenesSeleccionadas.includes(ordenes)) {
      this.ordenesSeleccionadas = this.ordenesSeleccionadas.filter(item => item !== ordenes);
      this.calculartotalsubivades();
    } else {

      this.ordenesSeleccionadas.push(ordenes);
      
      

// Utilizas el método reduce para acumular la suma de los totalOrden
this.calculartotalsubivades();

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


  calculartotalsubivades(){
    this.sumaTotalOrden = this.ordenesSeleccionadas.reduce((acumulador, orden) => acumulador + orden.totalOrden, 0);
    this.finalin=this.sumaTotalOrden -this.sumaTotalOrden * this.descuentonumero;
    this.finalin=this.finalin + this.finalin * this.empresaSeleccionada.iva;
  }

  cambiarEstadoBoton(orden: orden) {
    this.botonesSeleccionados[orden.idOrden] = !this.botonesSeleccionados[orden.idOrden];
    if (this.botonesSeleccionados[orden.idOrden]) {
      this.ordenSelect = orden;
    } else {
      this.ordenSelect = null;
    }
    this.seleccionarOrden(orden);
  }


}
