export class Persona {

    idPersona: number;
    nombrePer: string;
    correo: string;
    identificacion: string;
    direccion: string;
    telefono: string;

    constructor(idPersona?: number, nombrePer?: string, correo ?: string, identificacion?: string, direccion?: string,telefono?:number) {
        this.idPersona = this.idPersona ||0;
        this.nombrePer = this.nombrePer||'';
        this.correo = this.correo ||'';
        this.identificacion= this.identificacion ||"";
        this.direccion= this.direccion||'';
        this.telefono= this.telefono||'';
    }
}