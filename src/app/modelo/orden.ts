import { Persona } from "./persona";
import { venta } from "../venta/venta";
export class orden {
    idOrden:number;
    estado:number;
    totalOrden:number;
    venta:venta;
    personaO:Persona;
}
