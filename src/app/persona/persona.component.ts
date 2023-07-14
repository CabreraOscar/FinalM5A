import { Component, OnInit } from '@angular/core';
import { Persona } from '../modelo/persona';
import { personaService } from '../_services/persona.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
        text: 'Falta llenar un campo obligatorio'
      });
      return;
    }
    
    this.personaServicio.registrarPersona(this.persona).subscribe(dato => {
      console.log(dato);
      this.irAlalistaDePersona();
    }, error => {
      console.log(error);
    });
  }

irAlalistaDePersona(){
  this.router.navigate(['/lista-persona'])
}

  onSubmit(){
    this.guardarPersona();
  }
}
