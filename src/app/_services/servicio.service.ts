import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicio } from '../modelo/servicio';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private baseURL = "http://localhost:8080/servicio/listar";
  private baseURLC="http://localhost:8080/servicio/crear";
  private baseURLA="http://localhost:8080/servicio/actualizar";
  private baseURLE="http://localhost:8080/servicio/eliminar";
  private baseURLP="http://localhost:8080/servicio/porid";


  constructor(private httpClient : HttpClient) { }

  actualizarMaquina(id:number,servicio:Servicio):Observable<object>{
    return this.httpClient.put(environment.api_uri+'/servicio/actualizar/'+id,servicio);
    }
    
    
      //este metodo trae las maquinas
    obtenerListaMaquinas(): Observable<Servicio[]>{
      return this.httpClient.get<Servicio[]>(environment.api_uri+'/servicio/listar');
    }  
    
    eliminarMaquina(id:number): Observable<object>{
      return this.httpClient.delete(environment.api_uri+'/servicio/eliminar/'+id);
    }
    
    registrarMaquina(servicio:Servicio): Observable<Object>{
    return this.httpClient.post(environment.api_uri+'/servicio/crear',servicio)
    }
    
    obtenerMaquinaPorId(id:number): Observable<Servicio>{
      return this.httpClient.get<Servicio>(environment.api_uri+'/servicio/porid/'+id);
    }

}
