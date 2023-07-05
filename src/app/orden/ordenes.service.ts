import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { orden } from './orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenesService {
    private urlEndPoint:string='http://localhost:8080/api/orden';
    private httpHeaders= new HttpHeaders({ 'Content-Type': 'application/json' })
      constructor(private http:HttpClient) { }
    
  getOrdenes(): Observable<orden[]> {
    return this.http.get(this.urlEndPoint).pipe(
        map(response=>response as orden[])
      );
    }
    create (orden:orden):Observable<orden>{
   return this.http.post<orden>(this.urlEndPoint, orden,{headers:this.httpHeaders})
    }
    getOrden(id:number):Observable<orden>{
      return this.http.get<orden>(`${this.urlEndPoint}/${id}`);
    }
    eliminarC(id:number):Observable<orden>{
    return this.http.delete<orden>(`${this.urlEndPoint}/${id}`);
    }
}