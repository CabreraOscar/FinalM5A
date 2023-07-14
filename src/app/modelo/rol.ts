export class roles {
    idRol:number;
    nombre:string;
    descripcion: string;
    estado: number;
    
    constructor(idRol?: number, nombre?: string, descripcion?: string, estado?: number) {
        this.idRol = idRol ||0;
        this.nombre = nombre ||'';
        this.descripcion = descripcion || '';
        this.estado = estado||0;
    }
}
