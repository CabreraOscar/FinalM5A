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
  archivoAdjunto: File | null = null;

  constructor(private emailService: EmailService) {}

  enviarCorreoConAdjunto() {
    if (!this.archivoAdjunto) {
      console.error('Debe seleccionar un archivo PDF para adjuntar.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.archivoAdjunto);

    reader.onload = () => {
      const contenidoPDFBase64 = reader.result as string;
      const contenidoCorreo = `${this.contenido}\n\nAdjunto encontrarás el reporte en formato PDF.`;
      this.emailService.enviarCorreoConAdjunto(this.correoDestinatario, this.asunto, contenidoCorreo, contenidoPDFBase64).subscribe(
        response => {
          console.log('Correo con adjunto enviado exitosamente.');
        },
        error => {
          console.error('Error al enviar el correo con adjunto:', error);
        }
      );
    };
  }

  onFileSelected(event: any) {
    this.archivoAdjunto = event.target.files[0] as File;
  }
}