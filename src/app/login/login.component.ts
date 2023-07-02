import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formdata = { username: "",clave: "" };
  submit = false;
  loading = false;
  errorMessage = "";

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.canAuthenticate();
  }

  onSubmit(): void {
    this.loading = true;

    this.auth.login(this.formdata.username, this.formdata.clave)
      .subscribe({
        next: data => {
          // Store token from response data
          this.auth.storeToken(data.token);
          console.log('Logged in ' + data.token);
          this.auth.canAuthenticate();
        },
        error: data => {
          if (data.error.error.message == "INVALID_EMAIL") {
            this.errorMessage = "Email inválido!";
          } else if (data.error.error.message == "EMAIL_EXISTS") {
            this.errorMessage = "Este email ya existe!";
          } else {
            this.errorMessage = "Error al iniciar sesión!";
          }
        },
        complete: () => {
          this.loading = false;
          console.log('Proceso de inicio de sesión completado!');
        }
      });
  }
}