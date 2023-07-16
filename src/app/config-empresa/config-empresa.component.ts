import { Component, OnInit } from '@angular/core';
import { Empresa } from '../modelo/empresa';
import { EmpresaService } from '../_services/empresa.service';
import { Router } from '@angular/router';
import { AllScriptServiceService } from '../all-script-service.service';
import Swal from 'sweetalert2';

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


  guardarEmpresa() {
    var nombreEmpresa = this.empresai.nombreEmpresa;
    var ruc = this.empresai.ruc;
    var ubicacion = this.empresai.ubicacion;
    var telefono = this.empresai.telefono;
    
    if (!nombreEmpresa || !ruc || !ubicacion || !telefono) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar un campo obligatorio',
      });
      return;
    }
  
    // Lógica para registrar la empresa
  
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Los datos se han registrado correctamente'
    });
  
  
  
    this.empresaServicio.registrarEmpresa(this.empresai).subscribe(dato => {
      console.log(dato);
      this.obtenerEmpresa();
    }, error => console.log(error));
  }
  
  


  eliminarEmpresa(idConfig:number){
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.empresaServicio.eliminarEmpresa(idConfig).subscribe(dato =>{
          console.log(dato);
          this.obtenerEmpresa();
        });
        Swal.fire('Eliminado!', 'El elemento ha sido eliminado.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Acción cuando se hace clic en "Cancelar" o se cierra el SweetAlert
        Swal.fire('Cancelado', 'La eliminación ha sido cancelada.', 'info');
      }
    });
    }
  actualizarEmpresa(id:number){
    this.router.navigate(['actualizar-empresa',id]);
    
  }

}
