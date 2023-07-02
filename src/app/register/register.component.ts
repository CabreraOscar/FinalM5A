import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/Usuario';
import { Rol } from '../modelo/Rol';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formdata: any = {};
  loading: boolean = false;
  errorMessage: string = '';
  submit: boolean = false; 

  constructor(private http: HttpClient, private servi:AuthService) { }
  
  usuario:Usuario =new Usuario();
  rol:Rol= new Rol();

  onSubmit(): void {
    


  }
  validardatos(){
    this.rol.id_rol=1;
    this.usuario.roles=this.rol;

    this.servi.register(this.usuario).subscribe(data=>{
      alert("Se  a creado el usuario")
    
      
    },error=>{
      alert("Se a duplicado el Usuario")
    });
  
  }



  ngOnInit(): void {
  }
}


