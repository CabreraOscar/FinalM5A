import { Component, OnInit } from '@angular/core';
import { Empresa } from '../modelo/empresa';
import { EmpresaService } from '../_services/empresa.service';
import { Router } from '@angular/router';
import { AllScriptServiceService } from '../all-script-service.service';
import Swal from 'sweetalert2';
import { AuthService } from '../_services/auth.service';
import { DescuentoService } from '../_services/descuento.service';
import { Descuento } from '../modelo/descuento';

@Component({
  selector: 'app-config-empresa',
  templateUrl: './config-empresa.component.html',
  styleUrls: ['./config-empresa.component.css']
})
export class ConfigEmpresaComponent implements OnInit {
  id: number;
  idDes: number;
  nombreEmpresa: String;
  empresas: Empresa[];
  empresai: Empresa = new Empresa();
  descuentoO: Descuento = new Descuento();
  descuentoA: Descuento = new Descuento();
  descuentos: Descuento[];


  constructor(private auth: AuthService, private empresaServicio: EmpresaService, private descuentoService: DescuentoService, private router: Router, private AllScripts: AllScriptServiceService) {
    AllScripts.Cargar(["default/ventanas"]);
  }

  ngOnInit(): void {
    this.obtenerEmpresa();
    this.mostrarDescuento();
    let idRol = localStorage.getItem('idRol') ?? ''
    if (idRol != '') {
      if (idRol === '1') {

      } else {
        this.auth.canAuthenticate();
      }
    }
  }

  private obtenerEmpresa() {
    this.empresaServicio.obtenerListaDeEmpresa().subscribe(dato => {
      this.empresas = dato;
    });
  }
  validarRUC(ruc: string): boolean {
    let rucCorrecto = false;
  
    if (ruc.length == 13) {
      // Verificar que los primeros dos dígitos correspondan a un número de provincia válido
      let provincia = parseInt(ruc.substring(0, 2));
      if (provincia >= 1 && provincia <= 24) {
        // Verificar que el tercer dígito sea 6, 7, 8 o 9 (para RUC de personas jurídicas)
        // o 0, 1, 2 o 3 (para RUC de personas naturales)
        let tercerDigito = parseInt(ruc.substring(2, 3));
        if ((tercerDigito >= 6 && tercerDigito <= 9) || (tercerDigito >= 0 && tercerDigito <= 3)) {
          // Verificar el último dígito, que es el dígito verificador
          let verificador = parseInt(ruc.substring(12, 13));
          let coefValRUC = [3, 2, 7, 6, 5, 4, 3, 2];
          let suma = 0;
          let digito = 0;
          for (let i = 0; i < (ruc.length - 1); i++) {
            digito = parseInt(ruc.substring(i, i + 1)) * coefValRUC[i];
            suma += digito;
          }
          let residuo = suma % 11;
          let resultado = 11 - residuo;
          if (resultado == verificador) {
            rucCorrecto = true;
          } else if (resultado == 10 && verificador == 0) {
            rucCorrecto = true;
          } else {
            rucCorrecto = false;
          }
        } else {
          rucCorrecto = false;
        }
      } else {
        rucCorrecto = false;
      }
    } else {
      rucCorrecto = false;
    }
  
    return rucCorrecto;
  }
  guardarEmpresa() {
    var nombreEmpresa = this.empresai.nombreEmpresa;
    var ruc = this.empresai.ruc;
    var ubicacion = this.empresai.ubicacion;
    var telefono = this.empresai.telefono;
    var iva = this.empresai.iva;

    // Validar que los campos no estén vacíos.
    if (!nombreEmpresa) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo "nombre de la empresa"',
      });
      return;
    }

    if (!ruc) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo "RUC"',
      });
      return;
    }

    if (!ubicacion) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo "ubicación"',
      });
      return;
    }

    if (!telefono) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo "teléfono"',
      });
      return;
    }

    if (!iva) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo "IVA"/IVA inválido',
      });
      return;
    }

    // Validar que el RUC sea válido.
    if (!/^\d{13}$/.test(ruc)) {
      Swal.fire({
        icon: 'error',
        title: 'RUC inválido',
        text: 'El RUC debe tener 13 dígitos numéricos',
      });
      return;
    }

    // Validar que el teléfono sea válido.
    if (!/^09\d{8}$/.test(telefono)) {
      Swal.fire({
        icon: 'error',
        title: 'Teléfono inválido',
        text: 'El teléfono es incorrecto',
      });
      return;
    }

    // Validar que el IVA sea válido.
    if (!/^(\d{1,2})\.(\d{1,2})$/.test(String(iva))) {
      Swal.fire({
        icon: 'error',

        text: 'El IVA debe tener un formato de 0.00',
      });
      return;
    }
    if (this.empresas.some(empresai => empresai.ruc === this.empresai.ruc)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ya se ecuentra registrado ese RUC',
        confirmButtonText: 'OK'
      });

      return;
    }
    if (this.empresas.some(empresai => empresai.telefono === this.empresai.telefono)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ya existe  el mismo teléfono',
        confirmButtonText: 'OK'
      });
      return;
    }

    // Lógica para registrar la empresa.

    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Los datos se han registrado correctamente'
    });

    this.empresaServicio.registrarEmpresa(this.empresai).subscribe(dato => {
      console.log(dato);
      this.obtenerEmpresa();
    }, error => console.log(error));

    // Restablecer los campos del formulario a una cadena vacía
    this.empresai.nombreEmpresa = '';
    this.empresai.ruc = '';
    this.empresai.ubicacion = '';
    this.empresai.telefono = '';
    this.empresai.iva = 0;

    this.cerrarVentanaP();
  }

  /////////////////////////////////////////

  cerrarVentanaP() {
    var ventana: any;
    ventana = document.getElementById("ventana");
    ventana.style.display = "none";
  }

  cerrarVentanaD() {
    var ventana: any;
    ventana = document.getElementById("ventanad");
    ventana.style.display = "none";
  }


  eliminarEmpresa(idConfig: number) {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.empresaServicio.eliminarEmpresa(idConfig).subscribe(dato => {
          console.log(dato);
          this.obtenerEmpresa();
        });
        Swal.fire('Eliminado!', 'El elemento ha sido eliminado.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Acción cuando se hace clic en "Cancelar" o se cierra el SweetAlert
        Swal.fire('Cancelado', 'La eliminación ha sido cancelada.', 'info');
      }
    });
  }
  actualizarEmpresa(id: number) {
    this.router.navigate(['actualizar-empresa', id]);

  }






  ventanasAbiertas: { [key: string]: HTMLElement | null } = {};

  cerrarVentanaActual() {
    // Cerrar la ventana actual si existe
    for (const ventana in this.ventanasAbiertas) {
      if (this.ventanasAbiertas[ventana]) {
        this.ventanasAbiertas[ventana]!.style.display = "none";
      }
    }
  }

  //metodos de cerrar y abrir ventana

  mostrarVentana(ventanaId: string) {
    // Obtener el elemento con el ID proporcionado
    const ventana = document.getElementById(ventanaId);

    if (ventana) {
      this.cerrarVentanaActual();

      // Mostrar la ventana con el ID proporcionado
      ventana.style.display = "block";

      // Actualizar el diccionario de ventanas abiertas
      this.ventanasAbiertas[ventanaId] = ventana;
    }

    //aqui va el metodo de la lista.
  }

  //metodos de los descuentos

  guardarDescuento() {
    var nombreDescuento = this.descuentoO.nombre;
    var porcentaje = this.descuentoO.descuento;

    

    // Lógica para registrar la empresa.

    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Los datos se han registrado correctamente'
    });




    this.descuentoService.registrarDescuento(this.descuentoO).subscribe(
      dato => {
        console.log(dato);
        this.mostrarDescuento();
      },
      error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al registrar el descuento. Por favor, inténtalo de nuevo.',
        });
      }
    );

    this.descuentoO.nombre = '';
    this.descuentoO.descuento = 0;
    this.cerrarVentanaD();

  }

  private mostrarDescuento() {
    this.descuentoService.obtenerListaDeDescuento().subscribe(dato => {
      this.descuentos = dato;
    });
  }


  eliminarDescuento(idDes: number) {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.descuentoService.eliminarDescuento(idDes).subscribe(dato => {
          console.log(dato);
          this.mostrarDescuento();
        });
        Swal.fire('Eliminado!', 'El elemento ha sido eliminado.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Acción cuando se hace clic en "Cancelar" o se cierra el SweetAlert
        Swal.fire('Cancelado', 'La eliminación ha sido cancelada.', 'info');
      }
    });
  }

  cerrarDescuento() {
    const ventana = document.getElementById("ventanaDA");
    if (ventana) {
      ventana.style.display = "none";
    }
  }


  abrirDescuento(idDes: number) {
    const ventana = document.getElementById("ventanaDA");
    if (ventana) {
      ventana.style.display = "block";
      // Buscar el descuento en el arreglo de descuentos por el idDes
      const descuentoSeleccionado = this.descuentos.find(descuento => descuento.idDes === idDes);
      // Verificar si se encontró el descuento
      if (descuentoSeleccionado) {
        // Asignar los datos del descuento seleccionado a descuentoO para que se muestren en la ventana emergente
        this.descuentoA = { ...descuentoSeleccionado };
        this.descuentoA.descuento *= 100;
      }
    }
    console.log(idDes);
  }



  actualizarDescuento() {
    var idDescuento = this.descuentoA, idDes;
    var nombreDescuentoA = this.descuentoA.nombre;
    var porcentajeA = this.descuentoA.descuento;

    if (!nombreDescuentoA) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo "Nombre del Descuento"',
      });
      return;
    }

    if (!porcentajeA) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo "Porsentaje"',
      });
      return;
    }


    Swal.fire({
      icon: 'success',
      title: 'Actualización exitosa',
    });
    this.descuentoService.actualizarDescuento(this.descuentoA.idDes, this.descuentoA).subscribe(dato => {
      this.mostrarDescuento();
      this.cerrarDescuento();
      console.log(this.idDes)
    }, error => console.log(error))

  }

}
