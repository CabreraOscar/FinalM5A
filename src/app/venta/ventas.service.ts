import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { venta } from './venta';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private baseURL = "http://localhost:8080/venta/listar";
  private baseURLC="http://localhost:8080/venta/crear";
  private baseURLA="http://localhost:8080/venta/actualizar";
  private baseURLE="http://localhost:8080/venta/eliminar";
 
  
      constructor(private httpClient:HttpClient) { }
    
 actualizarventa(id:number,venta:venta):Observable<object>{
        return this.httpClient.put(`${this.baseURLA}/${id}`,venta);
        }
        
  //este metodo trae las maquinas
  getVentas(): Observable<venta[]>{
    return this.httpClient.get<venta[]>(`${this.baseURL}`);
  }  
  
  eliminarC(id:number): Observable<object>{
    return this.httpClient.delete(`${this.baseURLE}/${id}`);
  }
  
  registrarventa(venta:venta): Observable<Object>{
  return this.httpClient.post(`${this.baseURLC}`,venta)
  }
  

}