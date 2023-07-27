import { Component, OnInit } from '@angular/core';
import { Empresa } from '../modelo/empresa';
import { MaquinaService } from '../_services/maquina.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../_services/empresa.service';
import Swal from 'sweetalert2';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-actualizar-empresa',
  templateUrl: './actualizar-empresa.component.html',
  styleUrls: ['./actualizar-empresa.component.css']
})
export class ActualizarEmpresaComponent implements OnInit {

  id:number;
  empresas:Empresa=new Empresa();
  empresai:Empresa = new Empresa();
  constructor(private auth:AuthService, private empresasServicio:EmpresaService,private router:Router,private route:ActivatedRoute){}

  ngOnInit(): void {
    let idRol=localStorage.getItem('idRol') ?? ''
  if(idRol!=''){
    if(idRol==='1'){
         
    }else{
     this.auth.canAuthenticate();
    }
  }
    this.id = this.route.snapshot.params['id'];
    this.empresasServicio.obtenerEmpresaPorId(this.id).subscribe(dato =>{
      this.empresas = dato;
    },error => console.log(error));
  }

  onSubmit(){
    Swal.fire({
      icon: 'success',
      title: 'Actualización exitosa',
  
    });
    
    this.empresasServicio.actualizarEmpresa(this.id,this.empresas).subscribe(dato => {
      this.irALaListaDeEmpresas();
    },error =>console.log(error))
  }

  irALaListaDeEmpresas(){
    this.router.navigate(['/config-empresa']);
  }

}
