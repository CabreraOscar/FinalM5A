import { Component, OnInit } from '@angular/core';
import { Persona } from '../modelo/persona';
import { personaService } from '../_services/persona.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-cliente-ad-empleado',
  templateUrl: './cliente-ad-empleado.component.html',
  styleUrls: ['./cliente-ad-empleado.component.css']
})
export class ClienteAdEmpleadoComponent implements OnInit {

  persona: Persona = new Persona();


  constructor(private auth: AuthService, private personaServicio: personaService, private router: Router) { }

  ngOnInit(): void {
    let idRol=localStorage.getItem('idRol') ?? ''
    if(idRol!=''){
      if(idRol==='1'){
           
      }else{
       this.auth.canAuthenticate();
      }
    }
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
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Los datos se han registrado correctamente'
      });
      this.irAlalistaDePersona();
    }, error => {
      console.log(error);
    });
  }
  irAlalistaDePersona() {
    this.router.navigate(['/cliente-ad-empleado'])
  }

  onSubmit() {
    this.guardarPersona();
  }
}
