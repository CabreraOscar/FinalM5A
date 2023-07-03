import { Component, OnInit } from '@angular/core';
import { Empresa } from '../empresa';
import { EmpresaService } from '../empresa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-config-empresa',
  templateUrl: './config-empresa.component.html',
  styleUrls: ['./config-empresa.component.css']
})
export class ConfigEmpresaComponent implements OnInit {

  empresas: Empresa[];
  empresai:Empresa = new Empresa();

  constructor(private empresaServicio:EmpresaService,private router:Router) { }

  ngOnInit(): void {
    this.obtenerEmpresa();
    
  }

  private obtenerEmpresa(){
    this.empresaServicio.obtenerListaDeEmpresa().subscribe(dato => {
      this.empresas = dato;
    });
  }

  guardarEmpresa(){
    this.empresaServicio.registrarEmpresa(this.empresai).subscribe(dato =>{
      console.log(dato);
      this.obtenerEmpresa();

    },error => console.log(error));
  }



  eliminarEmpresa(idConfig:number){
    this.empresaServicio.eliminarEmpresa(idConfig).subscribe(dato =>{
      console.log(dato);
      this.obtenerEmpresa();
    });
  }

  actualizarEmpresa(id:number){
    this.router.navigate(['actualizar-empresa',id]);
  }
}
