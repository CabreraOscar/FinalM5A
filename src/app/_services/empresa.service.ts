import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../modelo/empresa';
import { environment } from 'src/environments/environment';

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
    return this.httpClient.get<Empresa[]>(environment.api_uri+'/configEmpresa/listar');
  }

  //metodo: sirve para crear una emporesa
  registrarEmpresa(empresai:Empresa): Observable<Object>{
    return this.httpClient.post(environment.api_uri+'/configEmpresa/crear',empresai);
  }

  actualizarEmpresa(idConfig:number,empresasi:Empresa): Observable<Object>{
    return this.httpClient.put(environment.api_uri+'/configEmpresa/actualizar/'+idConfig,empresasi);
  }

  eliminarEmpresa(idConfig:number): Observable<Object>{
    return this.httpClient.delete(environment.api_uri+'/configEmpresa/delete/'+idConfig);
  }

  obtenerEmpresaPorId(id:number): Observable<Empresa>{
    return this.httpClient.get<Empresa>(environment.api_uri+'/configEmpresa/porid/'+id);
  }
  
}
