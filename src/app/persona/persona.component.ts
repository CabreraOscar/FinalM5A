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
  
    if (!nombrePer) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo "nombre del cliente"',
      });
      return;
    }
  
    if (!direccion) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo "dirección"',
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
  
    
  
    if (!correo) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo "correo"',
      });
      return;
    }
    if (!identificacion) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo "cédula"',
      });
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(correo)) {
      Swal.fire({
        icon: 'error',
        title: 'Correo invalido',
        text: 'El correo debe tener el @ ',
      });
      return;
    }
  
    if (!/^\d{10}$/.test(identificacion)) {
      Swal.fire({
        icon: 'error',
        title: 'Cédula invalida',
        text: 'La cédula debe tener 10 dígitos ',
      });
      return;
    }
  
    // Validar que el teléfono sea válido.
    if (!/^\d{10}$/.test(String(telefono))) {
      Swal.fire({
        icon: 'error',
        title: 'Teléfono inválido',
        text: 'El teléfono debe tener entre 10 dígitos',
      });
      return;
    }
    this.personaServicio.registrarPersona(this.persona).subscribe(dato => {
      console.log(dato);
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Los datos se han registrado correctamente'
      });
      this.irAlalistaDePersona();
    }, error => {
      console.log(error);
    });
    this.persona.nombrePer = '';
    this.persona.direccion = '';
    this.persona.telefono = 0;
    this.persona.correo = '';
    this.persona.identificacion = '';
  
   
  }
 
  
irAlalistaDePersona(){
  this.router.navigate(['/lista-persona'])
}

  onSubmit(){
    this.guardarPersona();
  }
}
