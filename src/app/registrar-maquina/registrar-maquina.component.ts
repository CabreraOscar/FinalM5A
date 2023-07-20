import { Component, OnInit } from '@angular/core';
import { Maquina } from '../modelo/maquina';
import { MaquinaService } from '../_services/maquina.service';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registrar-maquina',
  templateUrl: './registrar-maquina.component.html',
  styleUrls: ['./registrar-maquina.component.css']
})
export class RegistrarMaquinaComponent implements OnInit {
maquina:Maquina = new Maquina();
maquinas: Maquina[];

  constructor(private maquinaServicio:MaquinaService,private router:Router) { }

  ngOnInit(): void {
    this.obtenermaquina();
    
  }

  private obtenermaquina(){
    this.maquinaServicio.obtenerListaMaquinas().subscribe(dato => {
      this.maquinas = dato;
    });
  }


  guardarMaquina() {
    // Verificar los valores de los campos
    var tamano = this.maquina.tamano;
    var precio = this.maquina.precio;
  
    if (!tamano ) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el campo tamaño'
      });
      return;
    }
    if (!precio) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Falta llenar el precio',
      });
      return;
    }
    if (this.maquinas.some(maquina => maquina.tamano === this.maquina.tamano)) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ya existe un tamaño igual',
        confirmButtonText: 'OK'
      });
        return;
      }
      if (this.maquinas.some(maquina => maquina.tamano.toLowerCase() === this.maquina.tamano.toLowerCase())) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ya existe ese nombre',
          confirmButtonText: 'OK'
        });
      
        return;
      }
    this.maquinaServicio.registrarMaquina(this.maquina).subscribe(dato => {
      console.log(dato);
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Los datos se han registrado correctamente'
      });
      
      this.irAlalistaDeMaquinas();
    }, error => {
      console.log(error);
    });
  }
irAlalistaDeMaquinas(){
  this.router.navigate(['/maquina-admin'])
}

  onSubmit(){
    this.guardarMaquina();
  }
}
