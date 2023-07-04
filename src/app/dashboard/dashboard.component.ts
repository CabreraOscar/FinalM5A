import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private auth:AuthService, private router: Router) { }
  user = {localId:"Bienvenido",displayName:""};
  ngOnInit(): void {
    this.auth.canAccess();
    if (this.auth.isAuthenticated()) {
        //call user details service
        this.auth.detail().subscribe({
          next:data=>{
              this.user.localId = data.users[0].localId;
              this.user.displayName = data.users[0].displayName;
          }
        })
    }
  }


  RegistraCliente(): void {
    this.router.navigate(['/persona']); 
    
  }
  RegistraMaquina(): void {
    this.router.navigate(['/maquina-admin']); 
    
  }
  Venta(): void {
    this.router.navigate(['/ventas']); 
    
  }
  Orden(): void {
    this.router.navigate(['/detalleorden']); 
    
  }
  Config(): void {
    this.router.navigate(['/config-empresa']); 
    
  }
  CrearEmple(): void {
    this.router.navigate(['/register']); 
    
  }
  AdminServicio(): void {
    this.router.navigate(['/servicio-admin'])
  }
}
