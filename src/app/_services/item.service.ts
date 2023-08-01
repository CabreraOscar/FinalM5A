import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Item } from '../modelo/item';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  private baseURLC="http://localhost:8080/item/crear";
  private baseURLE="http://localhost:8080/item/delete";
  private baseURLSO="http://localhost:8080/item/listarsinorden";
  private baseURLESI="http://localhost:8080/item/borrarsinorden";
  private baseURLACT="http://localhost:8080/item";

  constructor(private httpClient : HttpClient) { }

  registrarItem(item:Item): Observable<Object>{
    return this.httpClient.post(environment.api_uri+'/item/crear',item);
    }

    eliminarItem(id:number): Observable<object>{
      return this.httpClient.delete(environment.api_uri+'/item/delete/'+id);
    }
    obtenersinOrden(): Observable<Item[]>{
      return this.httpClient.get<Item[]>(environment.api_uri+'/item/listarsinorden');
    }  

    eliminarItemsConIdOrdenNulo(): Observable<any> {
      return this.httpClient.delete(environment.api_uri+'/item/borrarsinorden');
    }

    actualizarItem(id: number, item: Item): Observable<Item> {
      return this.httpClient.put<Item>(environment.api_uri+'/item/actualizar/'+id, item);
    }

}
