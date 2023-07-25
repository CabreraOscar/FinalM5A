import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../modelo/Usuario';
import { AuthService } from '../_services/auth.service';
import { rolService } from '../_services/rol.service';
import { roles } from '../modelo/rol';
import { Persona } from '../modelo/persona';
import { personaService } from '../_services/persona.service';
import Swal from 'sweetalert2';


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
  persona: Persona[]=[];
  selectedRol: roles;
  selectedPersona:Persona;
  rolSeleccionado: roles | null = null;
  personaSeleccionado: Persona | null = null; 
  inputValue: string = '';
  onSubmit(): void {
  }
  seleccionarRol(rol: roles) {
    this.selectedRol = rol;this.rolSeleccionado = rol;
  }
  
  seleccionarPersona(per:Persona) {
    this.selectedPersona= per; 
    this.personaSeleccionado = per;
    
    
  }
  
  obtenerPersona() {
    this.perserv.obtenerListaPersona().subscribe(dato => {
      this.persona = dato;

    });

  }

  buscarporcedula() {
    const valor: string = this.inputValue;
    this.perserv.obtenerPersonaPoridentificacion(valor).subscribe(dato => {
      this.per = dato;
      this.persona.splice(0, this.persona.length);
      this.persona.push(this.per);
    });
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
  
      const identificacion = this.selectedPersona.identificacion;
      const idRol = this.selectedRol.idRol;
      const username = this.usuario.username; // Asumimos que tienes un atributo 'username' en el objeto 'usuario' que contiene el nombre de usuario que se quiere validar
  
      // Obtener todos los usuarios existentes desde el backend
      this.servi.getAllUsuarios().subscribe(
        usuarios => {
          // Verificar si existe un usuario con la misma identificación y un rol diferente
          const existeUsuarioMismoRol = usuarios.some(usuario =>
            usuario.persona.identificacion === identificacion && usuario.roles.idRol === idRol
          );
  
          // Verificar si existe un usuario con el mismo username
          const existeUsuarioMismoUsername = usuarios.some(usuario =>
            usuario.username === username
          );
  
          if (existeUsuarioMismoRol) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ya existe un usuario con la misma identificación y rol.'
            }).then((result) => {
              // Esta función se ejecuta cuando el usuario cierra la alerta
              location.reload(); // Recargar la página
            });
          } else if (existeUsuarioMismoUsername) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ya existe el username ingresado '
            });
          } else {
            // Si no existe un usuario con el mismo rol ni con el mismo username, procede a crearlo
            this.servi.register(this.usuario).subscribe(
              data => {
                console.log('Respuesta del servicio de registro:', data);
                Swal.fire({
                  icon: 'success',
                  title: 'Éxito',
                  text: 'Se ha creado el usuario.'
                });
              },
              error => {
                console.error('Error del servicio de registro:', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'Se ha producido un error al crear el usuario.'
                });
              }
            );
          }
        },
        error => {
          console.error('Error al obtener los usuarios existentes:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Se ha producido un error al obtener los usuarios existentes.'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debes seleccionar una persona y un rol antes de registrar el usuario.'
     
      });
    }
  }
  
  
  ngOnInit(): void {
    this.obtenerRoles();
    this.obtenerPersonas();
  }

  obtenerPersonas(): void {
    this.perserv.obtenerListaPersona().subscribe(
      personas => {
        this.persona = personas;
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