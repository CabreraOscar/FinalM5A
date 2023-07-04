import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { roles } from './rol';





@Injectable({
  providedIn: 'root'
})
export class rolService {
  //esta url obtiene el listado de las maquinas en el backend
  private baseURL = "http://localhost:8080/rol/listar";
  private baseURLC="http://localhost:8080/rol/crear";
  private baseURLA="http://localhost:8080/rol/actualizar";
  private baseURLE="http://localhost:8080/rol/eliminar";
  private baseURLP="http://localhost:8080/rol/porid";

  constructor(private httpClient : HttpClient) { }


actualizarRol(id:number,rol:roles):Observable<object>{
return this.httpClient.put(`${this.baseURLA}/${id}`,rol);
}


  //este metodo trae las maquinas
obtenerListaRol(): Observable<roles[]>{
  return this.httpClient.get<roles[]>(`${this.baseURL}`);
}  



}
