import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { detalleorden } from './detalleorden';

@Injectable({
  providedIn: 'root'
})
export class DetalleordenService {
  private baseURL = "http://localhost:8080/persona/listar";
  private baseURLC="http://localhost:8080/servicio/crear";
  
  
  constructor(private httpClient : HttpClient) { }

  obtenerListadetalleorden(): Observable<detalleorden[]>{
    return this.httpClient.get<detalleorden[]>(`${this.baseURL}`);
  }  

  registrarorden(detalleorden:detalleorden): Observable<Object>{
    return this.httpClient.post(`${this.baseURLC}`,detalleorden)
    }

  
}
