import { Component, OnInit } from '@angular/core';
import { OrdenesService } from '../_services/ordenes.service';
import { orden } from '../modelo/orden';
import { Persona } from '../modelo/persona';
import { venta } from '../venta/venta';
import { VentasService } from '../_services/ventas.service';
import { AllScriptServiceService } from '../all-script-service.service';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { EmailService } from '../_services/email.service';
import Swal from 'sweetalert2';


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
  correoDestinatario: string = '';
  currentDate: string;
  factura: any = null;
  facturas: venta | null = null;
  mostrarFormularioCorreo: boolean = true;


  constructor(private emailService: EmailService, private ordenesService: OrdenesService, private ventasService: VentasService, private AllScripts: AllScriptServiceService) {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    this.currentDate = `${year}-${month}-${day}`;

    AllScripts.Cargar(["default/ventanas"]);

  }

  ngOnInit(): void {
    this.obtenerDatos();
    
  }


mostrartodasventas(){
  this.ventasService.mostrarDetalle().subscribe(dato => {
    this.ventas=dato;
      });

}


  


  

  validarCorreo(correo: string): boolean {
    // Puedes implementar la lógica de validación del correo aquí
    // Por ejemplo, puedes utilizar expresiones regulares para verificar si el correo tiene un formato válido
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo);
  }
  imprimirTabla() {
    this.mostrarFormularioCorreo = false;
    // Oculta todo el contenido adicional que no deseas imprimir
    const contenidoAdicional: HTMLElement | null = document.querySelector('.imprime');
    if (contenidoAdicional) {
      contenidoAdicional.style.display = 'none';
     
    }
    
    // Activar la función de impresión del navegador
    window.print();
  
    // Vuelve a mostrar el contenido oculto después de imprimir
    if (contenidoAdicional) {
      contenidoAdicional.style.display = 'block';
    }
  
    // Oculta el formulario
    
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
    this.metodosetearivaydescuento();
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
    this.mostrarFormularioCorreo = false;
    this.mostrarDetalleVenta = true; 
  }



  metodosetearivaydescuento(){
    var pepe: number=0;
    var x: number=0;
    x=this.ventag.subtotal;
    if(this.ventag.descuento === 0){
     pepe = this.ventag.subtotal;
    }else{
      pepe =x * this.ventag.descuento;
      this.ventag.descuento=pepe;//aqui esta ya el descuento pa restar
      x=this.ventag.subtotal-pepe;//almaceno en x ya restado el descuento

    }
    this.ventag.iva= x * this.ventag.iva;

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

  
 
  selectVenta(ventaselect: venta) {
    this.factura = ventaselect; // Almacena la factura seleccionada en this.factura
    this.cliente = this.factura.personaf.nombrePer;
    this.tipoPago = this.factura.tipoPago;
    this.fecha = this.factura.fecha;
    this.iva = this.factura.iva;
    this.subtotal = this.factura.subtotal;
    this.total = this.factura.total;
    this.correop = this.factura.personaf.correo;
    this.direccion = this.factura.personaf.direccion;
    this.identificacion = this.factura.personaf.identificacion;
    this.telefonop = this.factura.personaf.telefono;
    this.nombre = this.factura.configEmpresa.nombreEmpresa;
    this.ruc = this.factura.configEmpresa.ruc;
    this.telefonoe = this.factura.configEmpresa.telefono;
    this.ubicacion = this.factura.configEmpresa.ubicacion;
  
  }
  
  enviarCorreoConAdjunto() {
    // Verifica que haya una factura seleccionada antes de enviar el correo
    if (!this.factura) {
      // Muestra una alerta de error utilizando SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha seleccionado ninguna factura.',
        confirmButtonText: 'Aceptar'
      });
      return;
      
    }
    
    const contenidoCorreo = `
        Comprobante de Pago 
        Nombre de Empresa: ${this.nombre}
        RUC : ${this.ruc} 
        Teléfono : ${this.telefonoe} 
        Ubicación : ${this.ubicacion}
        Fecha: ${this.fecha}
        Cliente: ${this.cliente}
        Identificacion${this.identificacion}
        Correo: ${this.correop}
        Teléfono: ${this.telefonop}
        Dirección: ${this.direccion}
        Tipo de Pago: ${this.tipoPago}
        IVA: ${this.iva}
        Subtotal: ${this.subtotal}
        Total: ${this.total}
        

       
      `;
  
      this.emailService.enviarCorreoConAdjunto(this.correoDestinatario, 'Datos del Reporte', contenidoCorreo, this.factura).subscribe(
        response => {
          // Mostrar el Swal Alert de éxito
          Swal.fire('Correo enviado', 'El correo  se envió exitosamente.', 'success');
          console.log('Correo se a enviado exitosamente.');
        },
        error => {
          // Mostrar el Swal Alert de error
          Swal.fire('Error', 'Ocurrió un error al enviar el correo.', 'error');
          console.error('Error al enviar el correo:', error);
        }
      );
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
