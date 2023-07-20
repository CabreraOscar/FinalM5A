import { Component, OnInit } from '@angular/core';
import { Servicio } from '../modelo/servicio';
import { ServicioService } from '../_services/servicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-servicio',
  templateUrl: './actualizar-servicio.component.html',
  styleUrls: ['./actualizar-servicio.component.css']
})
export class ActualizarServicioComponent implements OnInit {
  id:number;
  servicio:Servicio=new Servicio();
  constructor(private servicioServicio:ServicioService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.servicioServicio.obtenerMaquinaPorId(this.id).subscribe(dato =>{
      this.servicio = dato;
    },error => console.log(error));
  }


  onSubmit(){
    Swal.fire({
      icon: 'success',
      title: 'Actualización exitosa',
  
    });

    this.servicioServicio.actualizarMaquina(this.id,this.servicio).subscribe(dato => {
      this.irAlaListaDeServicios();
    },error => console.log(error));
  }
 

  irAlaListaDeServicios(){
    this.router.navigate(['/servicio-admin']);
  }

}
