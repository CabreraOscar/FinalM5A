import { Component, OnInit } from '@angular/core';
import { Servicio } from '../modelo/servicio';
import { ServicioService } from '../_services/servicio.service';
import { Router } from '@angular/router';

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
      this.servicioServicio.eliminarMaquina(id).subscribe(dato => {
        this.obtenerServicios();   //pa que se actualize
      })
    }


    actualizarServicio(id:number){
      //aqui solo dirige ala pagina de actualizar servicio
      this.router.navigate(['actualizar-servicio',id]);
    }

}
