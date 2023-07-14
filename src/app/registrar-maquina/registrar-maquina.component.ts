import { Component, OnInit } from '@angular/core';
import { Maquina } from '../modelo/maquina';
import { MaquinaService } from '../_services/maquina.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-registrar-maquina',
  templateUrl: './registrar-maquina.component.html',
  styleUrls: ['./registrar-maquina.component.css']
})
export class RegistrarMaquinaComponent implements OnInit {
maquina:Maquina = new Maquina();
  constructor(private maquinaServicio:MaquinaService,private router:Router) { }

  ngOnInit(): void {
    
  }

  guardarMaquina(){
    this.maquinaServicio.registrarMaquina(this.maquina).subscribe(dato =>{
      console.log(dato);
      this.irAlalistaDeMaquinas();
    },error => console.log(error)); 
  }
irAlalistaDeMaquinas(){
  this.router.navigate(['/maquina-admin'])
}

  onSubmit(){
    this.guardarMaquina();
  }
}
