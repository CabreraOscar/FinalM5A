import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/Usuario';
import { AuthService } from '../_services/auth.service';
import { rolService } from '../rol.service';
import { roles } from '../rol';


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

  constructor(private roll: rolService, private http: HttpClient, private servi:AuthService) { }
  
  usuario:Usuario =new Usuario();
  rol:roles= new roles();
  roles: roles[] = [];
  onSubmit(): void {
  }
  selectedRol: roles;

  
  seleccionarRol(rol: roles) {
    this.selectedRol = rol;this.rolSeleccionado = rol;
  }
  rolSeleccionado: roles | null = null;

  
  validardatos() {
    if (this.selectedRol) {
      this.usuario.roles = {
        idRol: this.selectedRol.idRol,
        nombre: this.selectedRol.nombre,
        descripcion: this.selectedRol.descripcion,
        estado: this.selectedRol.estado
      };

      this.servi.register(this.usuario).subscribe(
        data => {
          alert("Se ha creado el usuario");
        },
        error => {
          alert("Se ha duplicado el Usuario");
        }
      );
    }
  }




  ngOnInit(): void {
    this.obtenerRoles();
    
  }




  obtenerRoles(): void {
    this.roll.obtenerListaRol().subscribe(
      roles => {
        this.roles = roles;
      },
      error => {
        console.error('Error al obtener los roles:', error);
      }
    );
  }
  getRoles(): void {
    this.roll.obtenerListaRol()
      .subscribe(roles => this.roles = roles);
  }
}


