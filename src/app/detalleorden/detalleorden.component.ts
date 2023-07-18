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
  cliente:string = '';
  persona:Persona[];
  personax:Persona=new Persona();
  maquinax:Maquina=new Maquina();
  itemSelect:Item=new Item();
  currentDate: string;
 suan:string="SIN SELECCIONAR";
 idorden:number;
 totalx:number = 0;
 maquinas:Maquina[];
 servicios:Servicio[];
 listaItem:Item[] = [];
 cantidad_maq:{ [key: string]: number } = {};
 cantidad_ser:{ [key: string]: number } = {};
 //FIN DE VARIABLES Y ARRAYS
  constructor(private itemServicio:ItemService,private servicioServicio:ServicioService,private maquinaServicio:MaquinaService,private personaServicio:personaService,private ordenesService: OrdenesService,private router:Router,private route:ActivatedRoute) {   const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    this.currentDate = `${year}-${month}-${day}`;}

  ngOnInit(): void {
    this.obtenerPersona();
    this.obtenerMaquinaria();
    this.obtenerServicios();
    this.obtenersinOrdenes();
    

  }
  obtenerPersona(){
    this.personaServicio.obtenerListaPersona().subscribe(dato => {
  this.persona=dato;
    });
  
    }

    buscarporcedula(){
      const valor: string = this.inputValue;
      this.personaServicio.obtenerPersonaPoridentificacion(valor).subscribe(dato => {
        this.personax=dato;
        this.persona.splice(0,this.persona.length);
        this.persona.push(this.personax);
          });
         
    }

    
  


    seleccionarPersona(personaselect:Persona){
      this.personax=personaselect;
      this.cedula=this.personax.identificacion;
      this.cliente=this.personax.nombrePer;
      console.log(this.personax.nombrePer);
      
      
    }



    obtenerMaquinaria(){
      this.maquinaServicio.obtenerListaMaquinas().subscribe(dato => {
    this.maquinas=dato;
      });
}


obtenerServicios(){
  this.servicioServicio.obtenerListaMaquinas().subscribe(dato => {
this.servicios=dato;
  });

  }


  crearItemMaquina(maquina: any, cantidad: number){  
    this.itemSelect = {} as Item; 
this.itemSelect.cantidad=cantidad;
this.itemSelect.maquina=maquina;

this.itemServicio.registrarItem(this.itemSelect).subscribe(dato =>{
console.log(dato);
this.obtenersinOrdenes();

},error => console.log(error) );
    
  }


  crearItemServicio(servicio: Servicio, cantidad: number){ 
    this.itemSelect = {} as Item; 
    this.itemSelect.cantidad=cantidad;
    this.itemSelect.servicio=servicio;
    
    this.itemServicio.registrarItem(this.itemSelect).subscribe(dato =>{
    console.log(dato);
    this.obtenersinOrdenes();
    
    },error => console.log(error) );
        
      }


  obtenersinOrdenes(){
    this.itemServicio.obtenersinOrden().subscribe(dato => {
  this.listaItem=dato;
  
  this.calculartotal();
    });
  
    }

calculartotal(){
  
  this.totalx = this.listaItem.reduce((acumulador, objeto) => acumulador + objeto.precioTotal, 0);
  this.totalx = Number(this.totalx.toFixed(2)); // Redondea a 2 decimales


  
}

eliminaritems(){
  this.itemServicio.eliminarItemsConIdOrdenNulo().subscribe(dato => {
    this.obtenersinOrdenes();   //pa que se actualize
    this.totalx=0;
  })
}



crearOrden(){
  if (this.cedula.trim() === '' || this.cliente.trim() === '' || this.totalx === 0) {
    Swal.fire('FALTAN DATOS PARA GENERAR LA ORDEN', '', 'warning');
    
  } else {
    Swal.fire('TODO CORRECTO', '', 'success');
    
  }
}


}
