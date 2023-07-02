
export class Rol {
    id_rol:number|undefined;
    nombre_del_rol:string;
    descripcion:string;
    estado:number;
    

    //los simbolos ? || sirve para crear objatos tipo usuario con 0 o varios atributos
    //para que no salga
    constructor(id_rol?: number, nombre_del_rol?: string, descripcion?: string, estado?: number) {
        this.id_rol = id_rol;
        this.nombre_del_rol = nombre_del_rol ||'';
        this.descripcion = descripcion ||'';
        this.estado= estado||0;
        
    }

}
