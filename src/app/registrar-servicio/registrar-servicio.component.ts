import { Component, OnInit } from '@angular/core';
import { Servicio } from '../modelo/servicio';
import { ServicioService } from '../_services/servicio.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-registrar-servicio',
  templateUrl: './registrar-servicio.component.html',
  styleUrls: ['./registrar-servicio.component.css']
})
export class RegistrarServicioComponent implements OnInit {
servicio:Servicio= new Servicio();
servicios: Servicio[];
  constructor(private auth:AuthService, private servicioServicio:ServicioService,private router:Router) { }

  ngOnInit(): void {
    this.obtenerservicio();
    let idRol=localStorage.getItem('idRol') ?? ''
  if(idRol!=''){
    if(idRol==='1'){
         
    }else{
     this.auth.canAuthenticate();
    }
  }
  }
  
  obtenerservicio(){
    this.servicioServicio.obtenerListaMaquinas().subscribe(dato => {
      this.servicios = dato;
    });
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
    if (this.servicios.some(servicio => servicio.nombre === this.servicio.nombre)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ya existe ese nombre',
        confirmButtonText: 'OK'
      });
    
      return;
    }
    if (this.servicios.some(servicio => servicio.nombre.toLowerCase() === this.servicio.nombre.toLowerCase())) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ya existe ese nombre',
        confirmButtonText: 'OK'
      });
    
      return;
    }
    if (this.servicios.some(servicio => servicio.descripcion === this.servicio.descripcion)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ya existe esa descripcion',
        confirmButtonText: 'OK'
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
   
  }
}
