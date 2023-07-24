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
    var iva = this.empresai.iva;
  
    // Validar que los campos no estén vacíos.
    if (!nombreEmpresa) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo "nombre de la empresa"',
      });
      return;
    }
  
    if (!ruc) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo "RUC"',
      });
      return;
    }
  
    if (!ubicacion) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo "ubicación"',
      });
      return;
    }
  
    if (!telefono) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo "teléfono"',
      });
      return;
    }
  
    if (!iva) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo "IVA"/IVA inválido',
      });
      return;
    }
  
    // Validar que el RUC sea válido.
    if (!/^\d{13}$/.test(ruc)) {
      Swal.fire({
        icon: 'error',
        title: 'RUC inválido',
        text: 'El RUC debe tener 13 dígitos numéricos',
      });
      return;
    }
  
    // Validar que el teléfono sea válido.
    if (!/^\d{10}$/.test(telefono)) {
      Swal.fire({
        icon: 'error',
        title: 'Teléfono inválido',
        text: 'El teléfono debe tener entre 10 dígitos',
      });
      return;
    }
  
    // Validar que el IVA sea válido.
    if (!/^(\d{1,2})\.(\d{1,2})$/.test(String(iva))) {
      Swal.fire({
        icon: 'error',
        
        text: 'El IVA debe tener un formato de 0.00',
      });
      return;
    }
    if (this.empresas.some(empresai => empresai.ruc === this.empresai.ruc)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ya se ecuentra registrado ese RUC',
        confirmButtonText: 'OK'
      });
    
      return;
    }
    if (this.empresas.some(empresai => empresai.telefono === this.empresai.telefono)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ya existe  el mismo teléfono',
        confirmButtonText: 'OK'
      });
        return;
      }
      if (this.empresas.some(empresai => empresai.nombreEmpresa === this.empresai.nombreEmpresa)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ya existe el mismo nombre',
          confirmButtonText: 'OK'
        });
          return;
        }
    // Lógica para registrar la empresa.
  
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: 'Los datos se han registrado correctamente'
    });
    
    this.empresaServicio.registrarEmpresa(this.empresai).subscribe(dato => {
      console.log(dato);
      this.obtenerEmpresa();
    }, error => console.log(error));
  
    // Restablecer los campos del formulario a una cadena vacía
    this.empresai.nombreEmpresa = '';
    this.empresai.ruc = '';
    this.empresai.ubicacion = '';
    this.empresai.telefono = '';
    this.empresai.iva = 0;
  
    this.cerrarVentanaP();
  }

  
  cerrarVentanaP() {
    var ventana: any;
    ventana = document.getElementById("ventana");
    ventana.style.display = "none";
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
