import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'registrar-pedido',
  templateUrl: './registrar-pedido.component.html',
  styleUrls: ['./registrar-pedido.component.css']
})
export class RegistrarPedidoComponent {
  cliente: string = '';
  direccion: string = '';
  lavadoraModelo: string = '';
  fechaEntrega: string = '';

  constructor() { }

  ngOnInit(): void {
  }
  registrarPedido(): void {
   
    console.log('Pedido registrado:');
    console.log('Cliente:', this.cliente);
    console.log('Dirección:', this.direccion);
    console.log('Modelo de lavadora:', this.lavadoraModelo);
    console.log('Fecha de entrega:', this.fechaEntrega);
  }
}
