export class Persona {

    idPersona: number;
    nombrePer: string;
    correo: string;
    identificacion: number;
    direccion: string;
    telefono: number;

    constructor(idPersona?: number, nombrePer?: string, correo ?: string, identificacion?: number, direccion?: string,telefono?:number) {
        this.idPersona = this.idPersona ||0;
        this.nombrePer = this.nombrePer||'';
        this.correo = this.correo ||'';
        this.identificacion= this.identificacion ||0;
        this.direccion= this.direccion||'';
        this.telefono= this.telefono||0;
    }
}