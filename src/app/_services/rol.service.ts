import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { roles } from '../modelo/rol';
import { environment } from 'src/environments/environment';





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
return this.httpClient.put(environment.api_uri+'/rol/actualizar/'+id,rol);
}


obtenerListaRol(): Observable<roles[]>{
  return this.httpClient.get<roles[]>(environment.api_uri+'/rol/listar');
}  



}
