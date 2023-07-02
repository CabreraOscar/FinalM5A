import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { venta } from './venta';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
    private urlEndPoint:string='http://localhost:8080/api/Venta';
    private httpHeaders= new HttpHeaders({ 'Content-Type': 'application/json' })
      constructor(private http:HttpClient) { }
    

  getVentas(): Observable<venta[]> {
    return this.http.get(this.urlEndPoint).pipe(
        map(response=>response as venta[])
      );
    }
    create (orden:venta):Observable<venta>{
   return this.http.post<venta>(this.urlEndPoint, venta,{headers:this.httpHeaders})
    }
    getOrden(id:number):Observable<venta>{
      return this.http.get<venta>(`${this.urlEndPoint}/${id}`);
    }
    eliminarC(id:number):Observable<venta>{
    return this.http.delete<venta>(`${this.urlEndPoint}/${id}`);
    }
}