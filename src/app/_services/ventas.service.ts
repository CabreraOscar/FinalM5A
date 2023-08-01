import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { venta } from '../venta/venta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  obtenerVentas(): any[] {
    throw new Error('Method not implemented.');
  }
  constructor(private httpClient: HttpClient) { }

  private baseURL = "http://localhost:8080/venta/listar";

  private baseURLC="http://localhost:8080/venta/crear";
  private baseURLA="http://tendencias.us-east-1.elasticbeanstalk.com/venta/actualizar";
  private baseURLE="http://localhost:8080/venta/eliminar";
  private baseURLB="http://localhost:8080/venta/buscar";
  private baseURLO="http://localhost:8080/venta/porid";
  private baseURLCID="http://localhost:8080/venta/crearyobtenerid";
  private baseURLVP = "http://tendencias.us-east-1.elasticbeanstalk.com/venta/buscarcedula";
   
  buscarPersonaVenta(identificacion: string, fecha: string): Observable<venta[]> {
    return this.httpClient.get<venta[]>(`${this.baseURLVP}/${identificacion},${fecha}`);
  }

  buscarPorFecha(fecha: String): Observable<venta[]> {
    return this.httpClient.get<venta[]>(environment.api_uri+'/venta/buscar/'+fecha);
  }


  actualizarventa(id: number, venta: venta): Observable<object> {
    return this.httpClient.put(`${this.baseURLA}/${id}`, venta);
  }

  //este metodo trae las maquinas
  mostrarDetalle(): Observable<venta[]> {
    return this.httpClient.get<venta[]>(environment.api_uri+'/venta/listar');
  }

  eliminarC(id: number): Observable<object> {
    return this.httpClient.delete(environment.api_uri+'/venta/eliminar/'+id);
  }

  obtenerventaPorId(id: number): Observable<venta> {
    return this.httpClient.get<venta>(environment.api_uri+'/venta/porid/'+id);
  }

  registrarventa(venta: venta): Observable<Object> {
    return this.httpClient.post(environment.api_uri+'/venta/crear', venta);
  }

  
  crearventaid(venta:venta): Observable<number> {
    return this.httpClient.post<number>(environment.api_uri+'/venta/crearyobtenerid', venta);
  }
  

}