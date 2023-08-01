import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { detalleorden } from '../modelo/detalleorden';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleordenService {
  private baseURL = "http://localhost:8080/persona/listar";
  private baseURLC="http://localhost:8080/servicio/crear";
  
  
  constructor(private httpClient : HttpClient) { }

  obtenerListadetalleorden(): Observable<detalleorden[]>{
    return this.httpClient.get<detalleorden[]>(environment.api_uri+'/persona/listar');
  }  

  registrarorden(detalleorden:detalleorden): Observable<Object>{
    return this.httpClient.post(environment.api_uri+'/servicio/crear',detalleorden)
    }

  
}
