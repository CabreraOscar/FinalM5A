import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { detalleorden } from './detalleorden';

@Injectable({
  providedIn: 'root'
})
export class DetalleordenService {
  private baseURL = "http://localhost:8080/persona/listar";
  private baseURLS = "http://localhost:8080/servicio/listar";
  private baseURLM = "http://localhost:8080/maquina/listar";
  
  constructor(private httpClient : HttpClient) { }

  obtenerListadetalleorden(): Observable<detalleorden[]>{
    return this.httpClient.get<detalleorden[]>(`${this.baseURL}`);
  }  

  obtenerListadetalleorden1(): Observable<detalleorden[]>{
    return this.httpClient.get<detalleorden[]>(`${this.baseURLS}`);
  }  

  obtenerListadetalleorden2(): Observable<detalleorden[]>{
    return this.httpClient.get<detalleorden[]>(`${this.baseURLM}`);
  }  
}
