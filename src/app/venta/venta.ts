import { Empresa } from "../empresa";
import { Persona } from "../modelo/persona";

export class venta {
   
  idVenta: number;
  fecha:Date = new Date();
  tipoPago: string;
  subtotal: number;
  descuento: number;
  iva: number;
  total: number;
  personaf: Persona;
  configEmpresa: Empresa;
  
  
}
