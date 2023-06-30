import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
formdata: any;
loading: any;
errorMessage: any;
fechaVenta: any;
submit: any;
onSubmit() {
throw new Error('Method not implemented.');
}


  constructor() { }

  ngOnInit(): void {
  }

}
