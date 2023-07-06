import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/Usuario';
import { AuthService } from '../_services/auth.service';
import { rolService } from '../rol.service';
import { roles } from '../rol';
import { Persona } from '../modelo/persona';
import { personaService } from '../persona.service';


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

  constructor(private perserv: personaService,private roll: rolService, private http: HttpClient, private servi:AuthService) { }
  
  usuario:Usuario =new Usuario();
  rol:roles= new roles();
  roles: roles[] = [];
  per:Persona =new Persona();
  personal: Persona[]=[];
  selectedRol: roles;
  selectedPersona:Persona;
  rolSeleccionado: roles | null = null;
  personaSeleccionado: Persona | null = null; 
  onSubmit(): void {
  }
  seleccionarRol(rol: roles) {
    this.selectedRol = rol;this.rolSeleccionado = rol;
  }
  
  seleccionarPersona(per:Persona) {
    this.selectedPersona= per; this.personaSeleccionado = per;
  }
  
  validardatos(): void {
    if (this.selectedPersona && this.selectedRol) {
      this.usuario.persona = {
        idPersona: this.selectedPersona.idPersona,
        nombrePer: this.selectedPersona.nombrePer,
        identificacion: this.selectedPersona.identificacion,
        direccion: this.selectedPersona.direccion,
        correo: this.selectedPersona.correo,
        telefono: this.selectedPersona.telefono
      };
  
      this.usuario.roles = {
        idRol: this.selectedRol.idRol,
        nombre: this.selectedRol.nombre,
        descripcion: this.selectedRol.descripcion,
        estado: this.selectedRol.estado
      };
  
      this.servi.register(this.usuario).subscribe(
        data => {
          console.log('Respuesta del servicio de registro:', data);
          alert("Se ha creado el usuario");
        },
        error => {
          console.error('Error del servicio de registro:', error);
          alert("Se ha producido un error al crear el usuario");
        }
      );
    } else {
      alert("Debes seleccionar una persona y un rol antes de registrar el usuario.");
    }
  }
  
  



  ngOnInit(): void {
    this.obtenerRoles();
    this.obtenerPersonas();
  }

  obtenerPersonas(): void {
    this.perserv.obtenerListaPersona().subscribe(
      personas => {
        this.personal = personas;
      },
      error => {
        console.error('Error al obtener los personas:', error);
      }
    );
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
  






  
}


