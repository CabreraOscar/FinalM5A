import { Component, OnInit } from '@angular/core';
import { Persona } from '../modelo/persona';
import { personaService } from '../_services/persona.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-lista-persona',
  templateUrl: './lista-persona.component.html',
  styleUrls: ['./lista-persona.component.css']
})
export class ListaPersonaComponent implements OnInit {

  persona:Persona[];
  
  constructor(private auth:AuthService, private personaServicio:personaService,private router:Router) { }
  

  ngOnInit(): void {
    let idRol=localStorage.getItem('idRol') ?? ''
  if(idRol!=''){
    if(idRol==='1'){
         
    }else{
     this.auth.canAuthenticate();
    }
  }
  this.obtenerPersona();
  }

  actualizarPersona(id:number){
    //aqui solo dirige ala pagina de actualizar maquina
    this.router.navigate(['actualizar-persona',id]);
  }

  eliminarPersona(id:number){
  Swal.fire({
    title: '¿Estás seguro de que deseas eliminar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      this.personaServicio.eliminarPersona(id).subscribe(dato => {
      
        this.obtenerPersona();   //pa que se actualize
      })
      Swal.fire('Eliminado!', 'El elemento ha sido eliminado.', 'success');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Acción cuando se hace clic en "Cancelar" o se cierra el SweetAlert
      Swal.fire('Cancelado', 'La eliminación ha sido cancelada.', 'info');
    }
  });
  }
 obtenerPersona(){
  this.personaServicio.obtenerListaPersona().subscribe(dato => {
this.persona=dato;
  });

  }

  


}
