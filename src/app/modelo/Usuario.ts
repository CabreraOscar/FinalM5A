import { roles } from "../rol";


export class Usuario {
    id_usuario:number|undefined;
    username:string;
    clave:string;
    roles:roles;
    

    //los simbolos ? || sirve para crear objatos tipo usuario con 0 o varios atributos
    //para que no salga
    constructor(id_usuario?: number, username?: string,clave?: string, rol?: roles) {
        this.id_usuario =  id_usuario;
        this. username =  username ||'';
        this.clave = clave ||'';
        this.roles= rol || new roles;
    }

}