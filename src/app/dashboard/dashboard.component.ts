import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
  
})
export class DashboardComponent implements OnInit {
  private angle = 0;
  @ViewChild('spinner') spiner: ElementRef;
  constructor(private auth:AuthService, private router: Router) { }
  user = {localId:"Bienvenido",displayName:""};
  ngOnInit(): void {
    let idRol=localStorage.getItem('idRol') ?? ''
  if(idRol!=''){
    if(idRol==='1'){
         
    }else{
     this.auth.canAuthenticate();
    }
  }
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
  
  galleryspin(sign: boolean): void {
    if (!sign) {
      this.angle = this.angle + 45;
    } else {
      this.angle = this.angle - 45;
    }

    // Aplicar la rotación al elemento spinner usando estilos CSS
    this.spiner.nativeElement.style.transform = `rotateY(${this.angle}deg)`;
  }
  abrirUrl(url: string) {
    window.open(url, 'https://drive.google.com/file/d/1CISPgacBkXdPgUxuCz8O70bbU_YNHlwz/view?usp=sharing');
  }
  abrirUrl2(url: string) {
    window.open(url, 'https://drive.google.com/drive/folders/1xqCdDKJ_XLiTmzJJSgXqOXgAqOzT9Ocd?usp=sharing');
  }

  abrirInformacion() {
    this.router.navigateByUrl('/informacion');
  }
  abrirInformacion1() {
    this.router.navigateByUrl('/register');
  }
}
