import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Descuento } from '../modelo/descuento';
import { Observable } from 'rxjs';

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
    return this.httpClient.post((`${this.baseURLC}`),descuento);
  }

  actualizarDescuento(idDes:number,descuento:Descuento): Observable<Object>{
    return this.httpClient.put(`${this.baseURLA}/${idDes}`,descuento);
  }

  obtenerListaDeDescuento():Observable<Descuento[]>{
    return this.httpClient.get<Descuento[]>(`${this.baseURLL}`);
  }

  eliminarDescuento(idDes:number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURLD}/${idDes}`);
  }




}
