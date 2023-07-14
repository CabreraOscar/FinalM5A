import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from './item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  private baseURLC="http://localhost:8080/item/crear";
  private baseURLE="http://localhost:8080/item/delete";




  constructor(private httpClient : HttpClient) { }

  registrarItem(item:Item): Observable<Object>{
    return this.httpClient.post(`${this.baseURLC}`,item)
    }

    eliminarItem(id:number): Observable<object>{
      return this.httpClient.delete(`${this.baseURLE}/${id}`);
    }


}
