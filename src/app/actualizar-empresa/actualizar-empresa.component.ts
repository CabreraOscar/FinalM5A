import { Component, OnInit } from '@angular/core';
import { Empresa } from '../empresa';
import { MaquinaService } from '../maquina.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService } from '../empresa.service';

@Component({
  selector: 'app-actualizar-empresa',
  templateUrl: './actualizar-empresa.component.html',
  styleUrls: ['./actualizar-empresa.component.css']
})
export class ActualizarEmpresaComponent implements OnInit {

  id:number;
  empresas:Empresa=new Empresa();

  constructor(private empresasServicio:EmpresaService,private router:Router,private route:ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.empresasServicio.obtenerEmpresaPorId(this.id).subscribe(dato =>{
      this.empresas = dato;
    })
  }

  onSubmit(){
    this.empresasServicio.actualizarEmpresa(this.id,this.empresas).subscribe(dato => {
      this.irALaListaDeEmpresas();
    },error =>console.log(error))
  }

  irALaListaDeEmpresas(){
    this.router.navigate(['/config-empresa']);
  }

}
