import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../modelo/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  //URL obtiene el listado de los empreados: backend
  private baseURL = "http://localhost:8080/configEmpresa/listar";
  private baseUrli = "http://localhost:8080/configEmpresa/crear";
  private baseUrle = "http://localhost:8080/configEmpresa/delete";
  private baseUrla = "http://localhost:8080/configEmpresa/actualizar";
  private baseUrlp = "http://localhost:8080/configEmpresa/porid";



  constructor(private httpClient : HttpClient) { }

  //metodo: sirve poara obtener los empleados
  obtenerListaDeEmpresa():Observable<Empresa[]>{
    return this.httpClient.get<Empresa[]>(`${this.baseURL}`);
  }

  //metodo: sirve para crear una emporesa
  registrarEmpresa(empresai:Empresa): Observable<Object>{
    return this.httpClient.post((`${this.baseUrli}`),empresai);
  }

  actualizarEmpresa(idConfig:number,empresasi:Empresa): Observable<Object>{
    return this.httpClient.put(`${this.baseUrla}/${idConfig}`,empresasi);
  }

  eliminarEmpresa(idConfig:number): Observable<Object>{
    return this.httpClient.delete(`${this.baseUrle}/${idConfig}`);
  }

  obtenerEmpresaPorId(id:number): Observable<Empresa>{
    return this.httpClient.get<Empresa>(`${this.baseUrlp}/${id}`)
  }
  
}
