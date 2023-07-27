import { Component, OnInit } from '@angular/core';
import { Maquina } from '../modelo/maquina';
import { ActivatedRoute, Router } from '@angular/router';
import { MaquinaService } from '../_services/maquina.service';
import Swal from 'sweetalert2';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-actualizar-maquina',
  templateUrl: './actualizar-maquina.component.html',
  styleUrls: ['./actualizar-maquina.component.css']
})
export class ActualizarMaquinaComponent implements OnInit {
id:number;
  maquina:Maquina=new Maquina();

  constructor(private auth:AuthService, private maquinaServicio:MaquinaService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    let idRol=localStorage.getItem('idRol') ?? ''
  if(idRol!=''){
    if(idRol==='1'){
         
    }else{
     this.auth.canAuthenticate();
    }
  }
    this.id = this.route.snapshot.params['id'];
    this.maquinaServicio.obtenerMaquinaPorId(this.id).subscribe(dato =>{
      this.maquina = dato;
    },error => console.log(error));
  }

  onSubmit(){
    Swal.fire({
      icon: 'success',
      title: 'Actualización exitosa',
  
    });
    this.maquinaServicio.actualizarMaquina(this.id,this.maquina).subscribe(dato => {
      this.irAlaListaDeMaquinaria();
    },error => console.log(error));
  }

  irAlaListaDeMaquinaria(){
    this.router.navigate(['/maquina-admin']);
  }



}