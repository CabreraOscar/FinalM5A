import { Component, OnInit } from '@angular/core';
import { Servicio } from '../modelo/servicio';
import { ServicioService } from '../_services/servicio.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servicio-admin',
  templateUrl: './servicio-admin.component.html',
  styleUrls: ['./servicio-admin.component.css']
})
export class ServicioAdminComponent implements OnInit {

  servicios:Servicio[];

  constructor(private servicioServicio:ServicioService,private router:Router) { }

  ngOnInit(): void {
    this.obtenerServicios();
  }

  obtenerServicios(){
    this.servicioServicio.obtenerListaMaquinas().subscribe(dato => {
  this.servicios=dato;
    });
  
    }



    eliminarServicio(id:number){
      Swal.fire({
        title: '¿Estás seguro de que deseas eliminar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.servicioServicio.eliminarMaquina(id).subscribe(dato => {
            this.obtenerServicios();   //pa que se actualize
          })
          Swal.fire('Eliminado!', 'El elemento ha sido eliminado.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Acción cuando se hace clic en "Cancelar" o se cierra el SweetAlert
          Swal.fire('Cancelado', 'La eliminación ha sido cancelada.', 'info');
        }
      });
      }
    actualizarServicio(id:number){
      //aqui solo dirige ala pagina de actualizar servicio
      this.router.navigate(['actualizar-servicio',id]);
    }

}
