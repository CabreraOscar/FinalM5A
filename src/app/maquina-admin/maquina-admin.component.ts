import { Component, OnInit } from '@angular/core';
import { Maquina } from '../maquina';
import { MaquinaService } from '../maquina.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maquina-admin',
  templateUrl: './maquina-admin.component.html',
  styleUrls: ['./maquina-admin.component.css']
})
export class MaquinaAdminComponent implements OnInit {

  maquinas:Maquina[];

  constructor(private maquinaServicio:MaquinaService,private router:Router) { }

  ngOnInit(): void {
  this.obtenerEmpleados();
  }

  actualizarMaquina(id:number){
    //aqui solo dirige ala pagina de actualizar maquina
    this.router.navigate(['actualizar-maquina',id]);
  }

  eliminarMaquina(id:number){
    this.maquinaServicio.eliminarMaquina(id).subscribe(dato => {
      
      this.obtenerEmpleados();   //pa que se actualize
    })
  }


 obtenerEmpleados(){
  this.maquinaServicio.obtenerListaMaquinas().subscribe(dato => {
this.maquinas=dato;
  });

  }

  

}


