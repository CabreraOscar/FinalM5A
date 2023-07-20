import { Component, OnInit } from '@angular/core';
import { Servicio } from '../modelo/servicio';
import { ServicioService } from '../_services/servicio.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-servicio',
  templateUrl: './registrar-servicio.component.html',
  styleUrls: ['./registrar-servicio.component.css']
})
export class RegistrarServicioComponent implements OnInit {
servicio:Servicio= new Servicio();
  constructor(private servicioServicio:ServicioService,private router:Router) { }

  ngOnInit(): void {

  }


  guardarServicio() {
    var nombre = this.servicio.nombre;
    var descripcion = this.servicio.descripcion;
    var precio = this.servicio.precio;
    
    if (!nombre) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo del nombre del servicio',
      });
      return;
    }
  if (!descripcion) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo de la descripcion"',
      });
      return;
    }
  
    if (!precio) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo del precio"',
      });
      return;
    }
    this.servicioServicio.registrarMaquina(this.servicio).subscribe(dato => {
      console.log(dato);
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Los datos se han registrado correctamente'
      });
      this.irAlalistaDeServicios();
    }, error => {
      console.log(error);
    });
  }
  
  irAlalistaDeServicios(){
    this.router.navigate(['/servicio-admin'])
  }


  onSubmit(){
    this.guardarServicio();
  }

}
