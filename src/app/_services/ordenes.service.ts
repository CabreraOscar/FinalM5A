import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { orden } from '../modelo/orden';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
  private baseURL = "http://localhost:8080/orden/listar";
  private baseURLC = "http://localhost:8080/orden/crear";
  private baseURLA = "http://tendencias.us-east-1.elasticbeanstalk.com/orden/actualizar";
  private baseURLE = "http://localhost:8080/orden/eliminar";
  private baseURLO = "http://localhost:8080/orden/porid";
  private baseURLB = "http://localhost:8080/orden/buscar";
  private baseURLMNN = "http://localhost:8080/orden/listarnonull";
  private baseURLMN = "http://localhost:8080/orden/listarnull";
  private baseOBID="http://localhost:8080/orden/crearyobtenerid";
  private baseURLLV = "http://localhost:8080/orden/listarVenta";

  constructor(private httpClient: HttpClient) { }

  actualizarorden(id: number, orden: orden): Observable<object> {
    return this.httpClient.put(`${this.baseURLA}/${id}`, orden);
  }

//este metodo trae las maquinas
getOrdenes(): Observable<orden[]> {
  return this.httpClient.get<orden[]>(environment.api_uri+'/orden/listarnonull');
}

getOrdenesNull(): Observable<orden[]> {
  return this.httpClient.get<orden[]>(environment.api_uri+'/orden/listarnull');
}

eliminarC(id: number): Observable<object> {
  return this.httpClient.delete(environment.api_uri+'/orden/eliminar/'+id);
}

registrarorden(orden: orden): Observable<Object> {
  return this.httpClient.post(environment.api_uri+'/orden/crear', orden);
}

obtenerOrdenPorId(id: number): Observable<orden> {
  return this.httpClient.get<orden>(environment.api_uri+'/orden/porid/'+id);
}

obtenerOrdenporVenta(id: number): Observable<orden[]>{
  return this.httpClient.get<orden[]>(environment.api_uri+'/orden/listarVenta/'+id);
}

obtenerPersonaPoridentificacion(identificacion:string): Observable<orden[]>{
  return this.httpClient.get<orden[]>(environment.api_uri+'/orden/buscar/'+identificacion);
}

crearordenid(orden: orden): Observable<number> {
  return this.httpClient.post<number>(environment.api_uri+'/orden/crearyobtenerid', orden);
}
}