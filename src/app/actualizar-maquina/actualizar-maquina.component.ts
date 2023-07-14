import { Component, OnInit } from '@angular/core';
import { Maquina } from '../modelo/maquina';
import { ActivatedRoute, Router } from '@angular/router';
import { MaquinaService } from '../_services/maquina.service';

@Component({
  selector: 'app-actualizar-maquina',
  templateUrl: './actualizar-maquina.component.html',
  styleUrls: ['./actualizar-maquina.component.css']
})
export class ActualizarMaquinaComponent implements OnInit {
id:number;
  maquina:Maquina=new Maquina();

  constructor(private maquinaServicio:MaquinaService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.maquinaServicio.obtenerMaquinaPorId(this.id).subscribe(dato =>{
      this.maquina = dato;
    },error => console.log(error));
  }

  onSubmit(){
    this.maquinaServicio.actualizarMaquina(this.id,this.maquina).subscribe(dato => {
      this.irAlaListaDeMaquinaria();
    },error => console.log(error));
  }

  irAlaListaDeMaquinaria(){
    this.router.navigate(['/maquina-admin']);
  }



}