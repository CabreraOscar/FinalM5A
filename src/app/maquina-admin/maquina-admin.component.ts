import { Component, OnInit } from '@angular/core';
import { Maquina } from '../modelo/maquina';
import { MaquinaService } from '../_services/maquina.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maquina-admin',
  templateUrl: './maquina-admin.component.html',
  styleUrls: ['./maquina-admin.component.css']
})
export class MaquinaAdminComponent implements OnInit {

  maquinas:Maquina[];

  constructor(private maquinaServicio:MaquinaService,private router:Router) { }

  ngOnInit(): void {
  this.obtenerEmpleados();
  }

  actualizarMaquina(id:number){
    //aqui solo dirige ala pagina de actualizar maquina
    this.router.navigate(['actualizar-maquina',id]);
  }

  
  eliminarMaquina(id:number){
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.maquinaServicio.eliminarMaquina(id).subscribe(dato => {
      
          this.obtenerEmpleados();   //pa que se actualize
        })
        Swal.fire('Eliminado!', 'El elemento ha sido eliminado.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Acción cuando se hace clic en "Cancelar" o se cierra el SweetAlert
        Swal.fire('Cancelado', 'La eliminación ha sido cancelada.', 'info');
      }
    });
    }

 obtenerEmpleados(){
  this.maquinaServicio.obtenerListaMaquinas().subscribe(dato => {
this.maquinas=dato;
  });

  }

  

}


