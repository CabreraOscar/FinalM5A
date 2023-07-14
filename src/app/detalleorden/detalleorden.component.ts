import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenesService } from '../_services/ordenes.service';
import { personaService } from '../_services/persona.service';
import { Persona } from '../modelo/persona';
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
  currentDate: string;
 suan:string="SIN SELECCIONAR";
 idorden:number;

 //FIN DE VARIABLES Y ARRAYS
  constructor(private personaServicio:personaService,private ordenesService: OrdenesService,private router:Router,private route:ActivatedRoute) {   const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    this.currentDate = `${year}-${month}-${day}`;}

  ngOnInit(): void {
    this.obtenerPersona();
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

}
