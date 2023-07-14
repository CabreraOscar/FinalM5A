import { roles } from "./rol";
import { Persona } from "./persona";


export class Usuario {
    id_usuario:number|undefined;
    username:string;
    clave:string;
    roles:roles;
    persona: Persona;
    

    constructor(id_usuario?: number, username?: string,clave?: string, rol?: roles,personas?:Persona) {
        this.id_usuario =  id_usuario;
        this. username =  username ||'';
        this.clave = clave ||'';
        this.roles= rol || new roles;
        this.persona= personas || new Persona;
    }

}