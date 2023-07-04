import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servicio } from './servicio';
import { Observable } from 'rxjs';

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
    return this.httpClient.put(`${this.baseURLA}/${id}`,servicio);
    }
    
    
      //este metodo trae las maquinas
    obtenerListaMaquinas(): Observable<Servicio[]>{
      return this.httpClient.get<Servicio[]>(`${this.baseURL}`);
    }  
    
    eliminarMaquina(id:number): Observable<object>{
      return this.httpClient.delete(`${this.baseURLE}/${id}`);
    }
    
    registrarMaquina(servicio:Servicio): Observable<Object>{
    return this.httpClient.post(`${this.baseURLC}`,servicio)
    }
    
    obtenerMaquinaPorId(id:number): Observable<Servicio>{
      return this.httpClient.get<Servicio>(`${this.baseURLP}/${id}`);
    }

}
