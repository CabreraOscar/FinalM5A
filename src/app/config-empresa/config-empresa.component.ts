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
  validado: boolean = false;
  ruc: String;
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
  
  validarRUC(ruc: string) {
    let numero = ruc;
      /* alert(numero); */
        let p1:number=0;
        let p2:number=0;
        let p3:number=0;
        let p4:number=0;
        let p5:number=0;
        let p6:number=0;
        let p7:number=0;
        let p8:number=0;
        let p9:number=0;
       
        var suma = 0;      
        var residuo = 0;      
        var pri = false;      
        var pub = false;            
        var nat = false;      
        var numeroProvincias = 22;                  
        var modulo = 11;
                    
        /* Verifico que el campo no contenga letras */                  
        var ok=1;
        let i=0;
        for (i=0; i<numero.length && ok==1 ; i++){
           var n = parseInt(numero.charAt(i));
           if (isNaN(n)) ok=0;
        }
        if (ok==0){
           
           Swal.fire({
            icon: 'error',
           title: 'No puede ingresar caracteres en el número',
         
       });        
           return false;
        }
                    
        if (numero.length < 10 ){  
          Swal.fire({
            icon: 'error',
           title: 'El número ingresado no es válido',
         
       });                    
                        
           return false;
        }
       
        /* Los primeros dos digitos corresponden al codigo de la provincia */
        let provincia = Number(numero.substr(0,2));      
        if (provincia < 1 || provincia > numeroProvincias){   
          Swal.fire({
            icon: 'error',
           title: 'El código de la provincia (dos primeros dígitos) es inválido',
         
       });                     
          
       return false;       
        }
  
        /* Aqui almacenamos los digitos de la cedula en variables. */
        let d1  =Number( numero.substr(0,1));         
        let d2  = Number(numero.substr(1,1));         
        let d3  =Number( numero.substr(2,1));         
        let d4  = Number(numero.substr(3,1));         
        let d5  = Number(numero.substr(4,1));         
        let d6  = Number(numero.substr(5,1));         
        let d7  = Number(numero.substr(6,1));         
        let d8  = Number(numero.substr(7,1));         
        let d9  = Number(numero.substr(8,1));         
        let d10 = Number(numero.substr(9,1));                
           
        /* El tercer digito es: */                           
        /* 9 para sociedades privadas y extranjeros   */         
        /* 6 para sociedades publicas */         
        /* menor que 6 (0,1,2,3,4,5) para personas naturales */ 
  
        if (d3==7 || d3==8){    
          Swal.fire({
            icon: 'error',
           title: 'El tercer dígito ingresado es inválido',
         
       });           
                            
           return false;
        }         
           
        /* Solo para personas naturales (modulo 10) */         
        if (d3 < 6){           
           nat = true;            
           p1 = d1 * 2;  if (p1 >= 10) p1 -= 9;
           p2 = d2 * 1;  if (p2 >= 10) p2 -= 9;
           p3 = d3 * 2;  if (p3 >= 10) p3 -= 9;
           p4 = d4 * 1;  if (p4 >= 10) p4 -= 9;
           p5 = d5 * 2;  if (p5 >= 10) p5 -= 9;
           p6 = d6 * 1;  if (p6 >= 10) p6 -= 9; 
           p7 = d7 * 2;  if (p7 >= 10) p7 -= 9;
           p8 = d8 * 1;  if (p8 >= 10) p8 -= 9;
           p9 = d9 * 2;  if (p9 >= 10) p9 -= 9;             
           modulo = 10;
        }         
  
        /* Solo para sociedades publicas (modulo 11) */                  
        /* Aqui el digito verficador esta en la posicion 9, en las otras 2 en la pos. 10 */
        else if(d3 == 6){           
           pub = true;             
           p1 = d1 * 3;
           p2 = d2 * 2;
           p3 = d3 * 7;
           p4 = d4 * 6;
           p5 = d5 * 5;
           p6 = d6 * 4;
           p7 = d7 * 3;
           p8 = d8 * 2;            
           p9 = 0;            
        }         
           
        /* Solo para entidades privadas (modulo 11) */         
        else if(d3 == 9) {           
           pri = true;                                   
           p1 = d1 * 4;
           p2 = d2 * 3;
           p3 = d3 * 2;
           p4 = d4 * 7;
           p5 = d5 * 6;
           p6 = d6 * 5;
           p7 = d7 * 4;
           p8 = d8 * 3;
           p9 = d9 * 2;            
        }
                  
        suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;                
        residuo = suma % modulo;                                         
  
        /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
       let  digitoVerificador = residuo==0 ? 0: modulo - residuo;                
  
        /* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/                         
        if (pub==true){           
           if (digitoVerificador != d9){                          
             
              Swal.fire({
                icon: 'error',
               title: 'El ruc de la empresa del sector público es incorrecto.',
             
           });           
                          
              return false;
           }                  
           /* El ruc de las empresas del sector publico terminan con 0001*/         
           if ( numero.substr(9,4) != '0001' ){    
            Swal.fire({
              icon: 'error',
             title: 'El ruc de la empresa del sector público debe terminar con 0001',
           
         });                    
              
              return false;
           }
        }         
        else if(pri == true){         
           if (digitoVerificador != d10){ 
            Swal.fire({
              icon: 'error',
             title: 'El ruc de la empresa del sector privado es incorrecto.',
           
         });                            
             
              return false;
           }         
           if ( numero.substr(10,3) != '001' ){  
            Swal.fire({
              icon: 'error',
             title: 'El ruc de la empresa del sector privado debe terminar con 001',
           
         });                   
           
              return false;
           }
        }      
  
        else if(nat == true){         
           if (digitoVerificador != d10){ 
            Swal.fire({
              icon: 'error',
             title: 'El número de cédula de la persona natural es incorrecto.',
           
         });                             
              
              return false;
           }         
           if (numero.length >10 && numero.substr(10,3) != '001' ){       
            Swal.fire({
              icon: 'error',
             title: 'El ruc de la persona natural debe terminar con 001',
           
         });                
             
              return false;
           }
        }      
        return true;   
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
     const Rucvalido = this.validarRUC(ruc);
     if (!Rucvalido) {
       Swal.fire({
             icon: 'error',
            title: 'RUC inválido',
            text: 'El RUC ingresado no es válido',
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
  onSubmit() {
    this.guardarEmpresa();
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

  guardarDescuento(descuento: number) {
    // Lógica para registrar la descuento
    if (descuento <= 0) {
      Swal.fire('CANTIDAD INVALIDA', '', 'warning');
    } else {

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
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Los datos se han registrado correctamente'
      });

      this.cerrarVentanaD();
    }

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
