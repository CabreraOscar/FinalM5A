import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from '../modelo/Usuario';

interface LoginResponse {
  success: boolean;
  token: string;
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl = 'http://tendencias.us-east-1.elasticbeanstalk.com/usuario';  
  constructor(private router: Router, private http: HttpClient) { }
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
 
  

  logout() {
    this.router.navigate(['/']);
  }
  
  isAuthenticated(): boolean {
    if (localStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }
  
getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuariostodos`);
  }
  canAccess() {
    if (!this.isAuthenticated()) {

      this.router.navigate(['/login']);
    }
  }

 

    //let user = String(localStorage.getItem("user"));
  

  canAuthenticate() {
    if (this.isAuthenticated()) {
     
      if(Number(localStorage.getItem("idRol"))===1) {
  
        this.router.navigate(['/dashboard']); 
       }else{
        this.router.navigate(['/pantalla-empleado']);
       }
    }
  }
confirmaRol(roll:number){
  if (this.isAuthenticated()) {
    
    if(roll===1){
     this.router.navigate(['/dashboard']); 
    }else{
     this.router.navigate(['/pantalla-empleado']);
    }
   }
}
  login(username: string, clave: string): Observable<any> {
    const data = {
      username: username,
      clave: clave
    };
  
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }
  verificarExistenciaUsuario(identificacion: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/verificarExistenciaUsuario/${identificacion}`);
  }
  
  register(usuario: Usuario) {
    return this.http.post(`${this.apiUrl}/crear`, usuario, { headers: this.httpHeaders });
  }
  
  storeToken(token: string) {
    localStorage.setItem('token', token);
  }
  removeToken() {
    localStorage.removeItem('token');
  }
  
  detail() {
    const token = localStorage.getItem('token');
    return this.http.get<{ users: { localId: string, displayName: string }[] }>(`${this.apiUrl}/user-details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

  

  
