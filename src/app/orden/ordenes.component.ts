import { Component, OnInit } from '@angular/core';
import { orden } from './orden';
import Swal from 'sweetalert2';
import { OrdenesService } from './ordenes.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent {

  ordenes: orden[]=[];
  constructor(private ordenesService: OrdenesService){}
  ngOnInit(): void {

   this.ordenesService.getOrdenes().subscribe(
ordenes=> this.ordenes=ordenes
   );
  }
}