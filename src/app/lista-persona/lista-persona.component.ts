import { Component, OnInit } from '@angular/core';
import { Persona } from '../modelo/persona';
import { personaService } from '../_services/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: ['./lista-persona.component.css']
})
export class ListaPersonaComponent implements OnInit {

  persona:Persona[];
  
  constructor(private personaServicio:personaService,private router:Router) { }
  

  ngOnInit(): void {
  this.obtenerPersona();
  }

  actualizarPersona(id:number){
    //aqui solo dirige ala pagina de actualizar maquina
    this.router.navigate(['actualizar-persona',id]);
  }

  eliminarPersona(id:number){
    this.personaServicio.eliminarPersona(id).subscribe(dato => {
      
      this.obtenerPersona();   //pa que se actualize
    })
  }


 obtenerPersona(){
  this.personaServicio.obtenerListaPersona().subscribe(dato => {
this.persona=dato;
  });

  }

  


}
