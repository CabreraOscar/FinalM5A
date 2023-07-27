import { Component, OnInit } from '@angular/core';
import { Persona } from '../modelo/persona';
import { ActivatedRoute, Router } from '@angular/router';
import { personaService } from '../_services/persona.service';
import Swal from 'sweetalert2';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-actualizar-persona',
  templateUrl: './actualizar-persona.component.html',
  styleUrls: ['./actualizar-persona.component.css']
})
export class ActualizarPersonaComponent implements OnInit {

  id:number;
  persona:Persona=new Persona();
  constructor(private auth:AuthService, private personaServicio:personaService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let idRol=localStorage.getItem('idRol') ?? ''
  if(idRol!=''){
    if(idRol==='1'){
         
    }else{
     this.auth.canAuthenticate();
    }
  }
    this.id = this.route.snapshot.params['id'];
    this.personaServicio.obtenerPersonaPorId(this.id).subscribe(dato =>{
      this.persona = dato;
    },error => console.log(error));
  }


  onSubmit(){
    Swal.fire({
      icon: 'success',
      title: 'Actualización exitosa',
  
    });
    this.personaServicio.actualizarPersona(this.id,this.persona).subscribe(dato => {
      this.irAlaListaDeServicios();
    },error => console.log(error));
  }


  irAlaListaDeServicios(){
    this.router.navigate(['/lista-persona']);
  }

}
