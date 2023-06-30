import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formdata: any = {};
  loading: boolean = false;
  errorMessage: string = '';
  submit: boolean = false; // Agrega esta línea

  constructor(private http: HttpClient) { }

  onSubmit(): void {
    // Realizar la solicitud HTTP al backend
    this.http.post<any>('/usuarios', this.formdata).subscribe(
      response => {
        // La respuesta del backend fue exitosa
        console.log('Usuario creado:', response);
        // Realizar las acciones necesarias en el frontend (mostrar mensaje, redireccionar, etc.)
      },
      error => {
        // Se produjo un error al realizar la solicitud al backend
        console.error('Error al crear el usuario:', error);
        // Realizar las acciones necesarias en el frontend (mostrar mensaje de error, etc.)
      }
    );
  }

  ngOnInit(): void {
  }
}


