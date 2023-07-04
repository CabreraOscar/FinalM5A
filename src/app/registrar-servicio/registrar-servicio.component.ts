import { Component, OnInit } from '@angular/core';
import { Servicio } from '../servicio';
import { ServicioService } from '../servicio.service';
import { Router } from '@angular/router';

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


  guardarServicio(){
    this.servicioServicio.registrarMaquina(this.servicio).subscribe(dato =>{
      console.log(dato);
      this.irAlalistaDeServicios();
    },error => console.log(error)); 
  }

  irAlalistaDeServicios(){
    this.router.navigate(['/servicio-admin'])
  }


  onSubmit(){
    this.guardarServicio();
  }

}
