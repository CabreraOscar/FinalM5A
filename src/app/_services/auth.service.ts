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

  public apiUrl = 'http://localhost:8080/usuario';  
  constructor(private router: Router, private http: HttpClient) { }
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
 
  logout() {
    this.router.navigate(['/']);
  }
  
  isAuthenticated(): boolean {
    if (sessionStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }

  canAccess() {
    if (!this.isAuthenticated()) {

      this.router.navigate(['/login']);
    }
  }

  canAuthenticate() {
    if (this.isAuthenticated()) {
    
      this.router.navigate(['/dashboard']);
    }
  }

  login(username: string, clave: string): Observable<any> {
    const data = {
      username: username,
      clave: clave
    };
  
    return this.http.post<any>(`${this.apiUrl}/login`, data);
  }
  
  register(username: Usuario) {
    return this.http.post(`${this.apiUrl}/crear`,username, {headers:this.httpHeaders});
  }
  storeToken(token: string) {
    sessionStorage.setItem('token', token);
  }
  removeToken() {
    sessionStorage.removeItem('token');
  }
  
  detail() {
    const token = sessionStorage.getItem('token');
    return this.http.get<{ users: { localId: string, displayName: string }[] }>(`${this.apiUrl}/user-details`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

  

  
