import { Component, OnInit } from '@angular/core';
import { Persona } from '../modelo/persona';
import { personaService } from '../_services/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  persona:Persona = new Persona();
  constructor(private personaServicio:personaService,private router:Router) { }

  ngOnInit(): void {
    
  }

  guardarPersona(){
    this.personaServicio.registrarPersona(this.persona).subscribe(dato =>{
      console.log(dato);
      this.irAlalistaDePersona();
    },error => console.log(error)); 
  }
irAlalistaDePersona(){
  this.router.navigate(['/lista-persona'])
}

  onSubmit(){
    this.guardarPersona();
  }
}
