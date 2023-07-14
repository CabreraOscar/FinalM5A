import { Maquina } from "./maquina";
import { orden } from "./orden/orden";
import { Servicio } from "./servicio";

export class Item {
    idItem:number;
    cantidad:number;
    precioTotal:number;
    servicio:Servicio;
    maquina:Maquina;
    orden:orden;
}
