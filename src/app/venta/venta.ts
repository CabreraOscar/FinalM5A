import { Empresa } from "../modelo/empresa";
import { Persona } from "../modelo/persona";

export class venta {
   
  idVenta: number;
  fecha:string ;
  tipoPago: string;
  subtotal: number;
  descuento: number;
  iva: number;
  total: number;
  personaf: Persona;
  configEmpresa: Empresa;
  
  
  // constructor(
  //   idVenta: number,
  //   fecha: string,
  //   tipoPago: string,
  //   subtotal: number,
  //   descuento: number,
  //   iva: number,
  //   total: number,
  //   personaf: Persona,
  //   configEmpresa: Empresa
  // ) {
  //   this.idVenta = idVenta;
  //   this.fecha = fecha;
  //   this.tipoPago = tipoPago;
  //   this.subtotal = subtotal;
  //   this.descuento = descuento;
  //   this.iva = iva;
  //   this.total = total;
  //   this.personaf = personaf;
  //   this.configEmpresa = configEmpresa;
  // }
}