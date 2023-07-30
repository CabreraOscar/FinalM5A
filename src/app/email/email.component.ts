import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailService } from '../_services/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})

export class EmailComponent {
  correoDestinatario = '';
  asunto = '';
  contenido = '';

  constructor(private emailService: EmailService) {}

  enviarCorreo() {
    this.emailService.enviarCorreo(this.correoDestinatario, this.asunto, this.contenido).subscribe(
      response => {
        console.log('Correo enviado exitosamente.');
      },
      error => {
        console.error('Error al enviar el correo:', error);
      }
    );
  }

}