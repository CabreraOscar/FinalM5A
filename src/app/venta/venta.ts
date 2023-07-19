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
  
  
}