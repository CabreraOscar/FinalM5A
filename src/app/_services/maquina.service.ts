import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Maquina } from '../modelo/maquina';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MaquinaService {
  //esta url obtiene el listado de las maquinas en el backend
  private baseURL = "http://localhost:8080/maquina/listar";
  private baseURLC="http://localhost:8080/maquina/crear";
  private baseURLA="http://localhost:8080/maquina/actualizar";
  private baseURLE="http://localhost:8080/maquina/eliminar";
  private baseURLP="http://localhost:8080/maquina/porid";

  constructor(private httpClient : HttpClient) { }


actualizarMaquina(id:number,maquina:Maquina):Observable<object>{
return this.httpClient.put(environment.api_uri+'/maquina/actualizar/'+id,maquina);
}


  //este metodo trae las maquinas
obtenerListaMaquinas(): Observable<Maquina[]>{
  return this.httpClient.get<Maquina[]>(environment.api_uri+'/maquina/listar');
}  

eliminarMaquina(id:number): Observable<object>{
  return this.httpClient.delete(environment.api_uri+'/maquina/eliminar/'+id);
}

registrarMaquina(maquina:Maquina): Observable<Object>{
return this.httpClient.post(environment.api_uri+'/maquina/crear',maquina);
}

obtenerMaquinaPorId(id:number): Observable<Maquina>{
  return this.httpClient.get<Maquina>(environment.api_uri+'/maquina/porid/'+id);
}
 
}
