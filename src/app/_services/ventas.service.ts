import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { venta } from '../venta/venta';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  obtenerVentas(): any[] {
    throw new Error('Method not implemented.');
  }
  constructor(private httpClient: HttpClient) { }

  private baseURL = "http://localhost:8080/venta/listar";
  private baseURLC = "http://localhost:8080/venta/crear";
  private baseURLA = "http://localhost:8080/venta/actualizar";
  private baseURLE = "http://localhost:8080/venta/eliminar";
  private baseURLB = "http://localhost:8080/venta/buscar";
  private baseURLO = "http://localhost:8080/venta/porid";
  private baseURLVP = "http://localhost:8080/venta/buscarcedula";




  buscarPersonaVenta(identificacion: string, fecha: string): Observable<venta[]> {
    return this.httpClient.get<venta[]>(`${this.baseURLVP}/${identificacion},${fecha}`);
  }
  
  

  buscarPorFecha(fecha: String): Observable<venta[]> {
    return this.httpClient.get<venta[]>(`${this.baseURLB}/${fecha}`)
  }


  actualizarventa(id: number, venta: venta): Observable<object> {
    return this.httpClient.put(`${this.baseURLA}/${id}`, venta);
  }

  //este metodo trae las maquinas
  mostrarDetalle(): Observable<venta[]> {
    return this.httpClient.get<venta[]>(`${this.baseURL}`);
  }

  eliminarC(id: number): Observable<object> {
    return this.httpClient.delete(`${this.baseURLE}/${id}`);
  }

  obtenerventaPorId(id: number): Observable<venta> {
    return this.httpClient.get<venta>(`${this.baseURLO}/${id}`)
  }

  registrarventa(venta: venta): Observable<Object> {
    return this.httpClient.post(`${this.baseURLC}`, venta)
  }


}