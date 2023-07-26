import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenesService } from '../_services/ordenes.service';
import { personaService } from '../_services/persona.service';
import { Persona } from '../modelo/persona';
import { MaquinaService } from '../_services/maquina.service';
import { Maquina } from '../modelo/maquina';
import { ServicioService } from '../_services/servicio.service';
import { Servicio } from '../modelo/servicio';
import { Item } from '../modelo/item';
import { ItemService } from '../_services/item.service';
import Swal from 'sweetalert2';
import { orden } from '../modelo/orden';
import { AllScriptServiceService } from '../all-script-service.service';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-detalleorden',
  templateUrl: './detalleorden.component.html',
  styleUrls: ['./detalleorden.component.css']

})
//obtenerListadetalleorden
export class DetalleordenComponent implements OnInit {

  //VARIABLES Y ARRAYS
  inputValue: string = '';
  cedula: string = '';
  cliente: string = '';
  personas: Persona[];
  personax: Persona = new Persona();
  persona: Persona = new Persona();
  maquinax: Maquina = new Maquina();
  orden: orden = new orden();
  itemSelect: Item = new Item();
  currentDate: string;
  suan: string = "SIN SELECCIONAR";
  idorden: number;
  totalx: number = 0;
  maquinas: Maquina[];
  servicios: Servicio[];
  listaItem: Item[] = [];
  cantidad_maq: { [key: string]: number } = {};
  cantidad_ser: { [key: string]: number } = {};
  idgenerado: number;
  //FIN DE VARIABLES Y ARRAYS
  constructor(private auth:AuthService, private itemServicio: ItemService, private servicioServicio: ServicioService, private maquinaServicio: MaquinaService, private personaServicio: personaService, private ordenesService: OrdenesService, private router: Router, private route: ActivatedRoute, private AllScripts:
    AllScriptServiceService) {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    this.currentDate = `${year}-${month}-${day}`;

    AllScripts.Cargar(["default/ventanas"]);
  }

  ngOnInit(): void {
    this.obtenerPersona();
    this.obtenerMaquinaria();
    this.obtenerServicios();
    this.obtenersinOrdenes();
    

  }
  obtenerPersona() {
    this.personaServicio.obtenerListaPersona().subscribe(dato => {
      this.personas = dato;

    });

  }

  buscarporcedula() {
    const valor: string = this.inputValue;
    this.personaServicio.obtenerPersonaPoridentificacion(valor).subscribe(dato => {
      this.personax = dato;
      this.personas.splice(0, this.personas.length);
      this.personas.push(this.personax);
    });
  }

  verificarInput(): void {
    if (this.inputValue === '') {
      this.obtenerPersona();
    }
  }


  Registra(): void {
    this.router.navigate(['/cliente-ad-empleado']);

  }


  seleccionarPersona(personaselect: Persona) {
    this.personax = personaselect;
    this.cedula = this.personax.identificacion;
    this.cliente = this.personax.nombrePer;
    console.log(this.personax.nombrePer);
    this.cerrarVentanaP();
  }

  cerrarVentanaP() {
    var ventana: any;
    ventana = document.getElementById("ventanap");
    ventana.style.display = "none";
  }

  cerrarVentanaR() {
    var ventana: any;
    ventana = document.getElementById("ventanar");
    ventana.style.display = "none";
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
    this.obtenerPersona();
  }






  obtenerMaquinaria() {
    this.maquinaServicio.obtenerListaMaquinas().subscribe(dato => {
      this.maquinas = dato;
    });
  }


  obtenerServicios() {
    this.servicioServicio.obtenerListaMaquinas().subscribe(dato => {
      this.servicios = dato;
    });

  }


  crearItemMaquina(maquina: any, cantidad: number) {
    this.itemSelect = {} as Item;
    this.itemSelect.cantidad = cantidad;
    this.itemSelect.maquina = maquina;

    this.itemServicio.registrarItem(this.itemSelect).subscribe(dato => {
      console.log(dato);
      this.obtenersinOrdenes();

    }, error => console.log(error));

  }


  crearItemServicio(servicio: Servicio, cantidad: number) {
    this.itemSelect = {} as Item;
    this.itemSelect.cantidad = cantidad;
    this.itemSelect.servicio = servicio;

    this.itemServicio.registrarItem(this.itemSelect).subscribe(dato => {
      console.log(dato);
      this.obtenersinOrdenes();

    }, error => console.log(error));

  }


  obtenersinOrdenes() {
    this.itemServicio.obtenersinOrden().subscribe(dato => {
      this.listaItem = dato;

      this.calculartotal();
    });

  }

  calculartotal() {

    this.totalx = this.listaItem.reduce((acumulador, objeto) => acumulador + objeto.precioTotal, 0);
    this.totalx = Number(this.totalx.toFixed(2)); // Redondea a 2 decimales



  }

  eliminaritems() {
    this.itemServicio.eliminarItemsConIdOrdenNulo().subscribe(dato => {
      this.obtenersinOrdenes();   //pa que se actualize
      this.totalx = 0;
    })
  }


  //codigo para crear una orden
  crearOrden() {
    if (this.cedula.trim() === '' || this.cliente.trim() === '' || this.totalx === 0) {
      Swal.fire('FALTAN DATOS PARA GENERAR LA ORDEN', '', 'warning');

    } else {
      this.orden.personaO = this.personax;
      this.orden.estado = 0;
      this.orden.totalOrden = this.totalx;
      //
      this.ordenesService.crearordenid(this.orden).subscribe(
        idOrden => {
          this.idgenerado = idOrden; // Asignamos el ID generado a la variable idgenerado
          console.log('ID de la orden creada:', this.idgenerado);
          // Aquí puedes hacer algo con el ID de la orden, como mostrarlo en un mensaje o redireccionar a otra página

          this.ordenesService.obtenerOrdenPorId(this.idgenerado).subscribe(
            orden => {
              console.log(orden);
              for (const item of this.listaItem) {
                if (!item.orden) {
                  item.orden = orden;
                  this.actualizarOrdenItemEnBackend(item.idItem, item); // Pasamos el objeto 'item' completo
                }
              }

            },
            error => {
              console.error('Error al obtener la orden:', error);
              // Maneja el error aquí si es necesario
            }
          );


        },
        error => {
          console.error('Error al crear la orden:', error);
          // Maneja el error aquí si es necesario
        }
      );
      //



      Swal.fire('TODO CORRECTO', '', 'success').then(() => {
        // Recargar la página después de que el usuario hace clic en el botón "Aceptar" de la alerta
        window.location.reload();
      });

    }
  }

  actualizarOrdenItemEnBackend(idItem: number, item: Item) {
    this.itemServicio.actualizarItem(idItem, item).subscribe(
      itemActualizado => {
        console.log('Item actualizado en el backend:', itemActualizado);
      },
      error => {
        console.error('Error al actualizar el item en el backend:', error);
        // Maneja el error aquí si es necesario
      }
    );
  }



  guardarPersona() {
    console.log(this.persona); // Verificar los valores de los campos
    var nombrePer = this.persona.nombrePer;
    var direccion = this.persona.direccion;
    var telefono = this.persona.telefono;
    var correo = this.persona.correo;
    var identificacion = this.persona.identificacion;
  
    if (!nombrePer || !direccion || !telefono || !correo || !identificacion) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor, complete todos los campos.',
      });
      return;
    }
  
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9_.-]+$/.test(correo)) {
      Swal.fire({
        icon: 'error',
        title: 'Correo inválido',
        text: 'El formato del correo es incorrecto.',
      });
      return;
    }
  
    if (!/^\d{10}$/.test(identificacion)) {
      Swal.fire({
        icon: 'error',
        title: 'Cédula inválida',
        text: 'La cédula debe tener 10 dígitos.',
      });
      return;
    }
  
    if (!/^\d{10}$/.test(String(telefono))) {
      Swal.fire({
        icon: 'error',
        title: 'Teléfono inválido',
        text: 'El teléfono debe tener 10 dígitos.',
      });
      return;
    }
  
    // Validar que no haya duplicados en correo, identificación y teléfono.
    if (this.personas.some(persona => persona.correo === correo)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ya existe una persona con el mismo correo.',
        confirmButtonText: 'OK'
      });
      return;
    }
  
    if (this.personas.some(persona => persona.identificacion === identificacion)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ya existe una persona con la misma cédula.',
        confirmButtonText: 'OK'
      });
      return;
    }
  
    if (this.personas.some(persona => persona.telefono === telefono)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ya existe una persona con el mismo teléfono.',
        confirmButtonText: 'OK'
      });
      return;
    }
  
    // Código para guardar la persona
    this.personaServicio.registrarPersona(this.persona).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Los datos se han registrado correctamente'
        });
        this.cerrarVentanaR();
      },
      error => {
        console.log(error);
      }
    );
  
    // Limpiar los campos después de guardar
    this.persona.nombrePer = '';
    this.persona.direccion = '';
    this.persona.telefono = '';
    this.persona.correo = '';
    this.persona.identificacion = '';
  }
  

  onSubmit() {
    this.guardarPersona();
  }





}
