import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from './modelo/persona';


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

  constructor(private httpClient : HttpClient) { }


actualizarPersona(id:number,persona:Persona):Observable<object>{
return this.httpClient.put(`${this.baseURLA}/${id}`,persona);
}


  //este metodo trae las maquinas
obtenerListaPersona(): Observable<Persona[]>{
  return this.httpClient.get<Persona[]>(`${this.baseURL}`);
}  

eliminarPersona(id:number): Observable<object>{
  return this.httpClient.delete(`${this.baseURLE}/${id}`);
}

registrarPersona(persona:Persona): Observable<Object>{
return this.httpClient.post(`${this.baseURLC}`,persona)
}

obtenerPersonaPorId(id:number): Observable<Persona>{
  return this.httpClient.get<Persona>(`${this.baseURLP}/${id}`);
}
 
}
