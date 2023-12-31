import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Descuento } from '../modelo/descuento';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DescuentoService {

  private baseURLC = "http://localhost:8080/descuento/crear";
  private baseURLL = "http://localhost:8080/descuento/listar";
  private baseURLA = "http://localhost:8080/descuento/actualizar";
  private baseURLD = "http://localhost:8080/descuento/eliminar";

  constructor(private httpClient: HttpClient) { }


  registrarDescuento(descuento:Descuento): Observable<Object>{
    return this.httpClient.post(environment.api_uri+'/descuento/crear',descuento);
  }

  actualizarDescuento(idDes:number,descuento:Descuento): Observable<Object>{
    return this.httpClient.put(environment.api_uri+'/descuento/actualizar/'+idDes,descuento);
  }

  obtenerListaDeDescuento():Observable<Descuento[]>{
   // return this.httpClient.get<Descuento[]>(`${this.baseURLL}`);
   return this.httpClient.get<Descuento[]>(environment.api_uri+'/descuento/listar');
  }

  eliminarDescuento(idDes:number): Observable<Object>{
    return this.httpClient.delete(environment.api_uri+'/eliminar/'+idDes);
  }




}
