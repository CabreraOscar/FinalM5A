import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Item } from '../modelo/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  private baseURLC="http://localhost:8080/item/crear";
  private baseURLE="http://localhost:8080/item/delete";
  private baseURLSO="http://localhost:8080/item/listarsinorden";
  private baseURLESI="http://localhost:8080/item/borrarsinorden";


  constructor(private httpClient : HttpClient) { }

  registrarItem(item:Item): Observable<Object>{
    return this.httpClient.post(`${this.baseURLC}`,item)
    }

    eliminarItem(id:number): Observable<object>{
      return this.httpClient.delete(`${this.baseURLE}/${id}`);
    }
    obtenersinOrden(): Observable<Item[]>{
      return this.httpClient.get<Item[]>(`${this.baseURLSO}`);
    }  

    eliminarItemsConIdOrdenNulo(): Observable<any> {
      return this.httpClient.delete(`${this.baseURLESI}`);
    }


}
