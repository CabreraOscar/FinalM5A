import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../modelo/persona';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class personaService {
  //esta url obtiene el listado de las maquinas en el backend
  private baseURL = "http://localhost:8080/persona/listar";
  private baseURLC="http://localhost:8080/persona/crear";
  private baseURLA="http://localhost:8080/persona/actualizar";
  private baseURLE="http://localhost:8080/persona/delete";
  private baseURLP="http://localhost:8080/persona/porid";
  private baseURLI="http://localhost:8080/persona/personas";

  constructor(private httpClient : HttpClient) { }


actualizarPersona(id:number,persona:Persona):Observable<object>{
return this.httpClient.put(environment.api_uri+'/persona/actualizar/'+id,persona);
}
guardarPersona(persona: any) {
  return this.httpClient.post(environment.api_uri+'/persona/listar', persona);
}

  //este metodo trae las maquinas
obtenerListaPersona(): Observable<Persona[]>{
  return this.httpClient.get<Persona[]>(environment.api_uri+'/persona/listar');
}  

eliminarPersona(id:number): Observable<object>{
  return this.httpClient.delete(environment.api_uri+'/persona/delete/'+id);
}

registrarPersona(persona:Persona): Observable<Object>{
return this.httpClient.post(environment.api_uri+'/persona/crear',persona);
}

obtenerPersonaPorId(id:number): Observable<Persona>{
  return this.httpClient.get<Persona>(environment.api_uri+'/persona/porid/'+id);
}


obtenerPersonaPoridentificacion(identificacion:string): Observable<Persona>{
  return this.httpClient.get<Persona>(environment.api_uri+'/persona/personas/'+identificacion);
}
 
}
