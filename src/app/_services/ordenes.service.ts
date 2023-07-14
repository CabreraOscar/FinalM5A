import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { orden } from '../modelo/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  private baseURL = "http://localhost:8080/orden/listar";
  private baseURLC = "http://localhost:8080/orden/crear";
  private baseURLA = "http://localhost:8080/orden/actualizar";
  private baseURLE = "http://localhost:8080/orden/eliminar";
  private baseURLO = "http://localhost:8080/orden/porid";
  private baseURLB = "http://localhost:8080/orden/buscar"

  constructor(private httpClient: HttpClient) { }

  actualizarorden(id: number, orden: orden): Observable<object> {
    return this.httpClient.put(`${this.baseURLA}/${id}`, orden);
  }


  //este metodo trae las maquinas
  getOrdenes(): Observable<orden[]> {
    return this.httpClient.get<orden[]>(`${this.baseURL}`);
  }

  eliminarC(id: number): Observable<object> {
    return this.httpClient.delete(`${this.baseURLE}/${id}`);
  }

  registrarorden(orden: orden): Observable<Object> {
    return this.httpClient.post(`${this.baseURLC}`, orden)
  }

  obtenerOrdenPorId(id: number): Observable<orden> {
    return this.httpClient.get<orden>(`${this.baseURLO}/${id}`)
  }

  obtenerPersonaPoridentificacion(identificacion:string): Observable<orden[]>{
    return this.httpClient.get<orden[]>(`${this.baseURLB}/${identificacion}`);
  }

}