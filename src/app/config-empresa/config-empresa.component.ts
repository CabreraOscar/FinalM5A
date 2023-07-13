import { Component, OnInit } from '@angular/core';
import { Empresa } from '../empresa';
import { EmpresaService } from '../empresa.service';
import { Router } from '@angular/router';
import { AllScriptServiceService } from '../all-script-service.service';

@Component({
  selector: 'app-config-empresa',
  templateUrl: './config-empresa.component.html',
  styleUrls: ['./config-empresa.component.css']
})
export class ConfigEmpresaComponent implements OnInit {
  nombreEmpresa: String;
  empresas: Empresa[];
  empresai:Empresa = new Empresa();

  constructor(private empresaServicio:EmpresaService,private router:Router,private AllScripts: AllScriptServiceService) { 
    AllScripts.Cargar(["default/ventanas"]);
  }

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
