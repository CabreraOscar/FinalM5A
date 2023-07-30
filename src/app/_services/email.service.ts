import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {

  private baseURL = "http://localhost:8080/api/email/sentCodeVerification";

  constructor(private httpClient: HttpClient) { }

  enviarCorreo(correoDestinatario: string, asunto: string, contenido: string): Observable<any> {
    const emailData = {
      to: correoDestinatario,
      subject: asunto,
      text: contenido
    };
    return this.httpClient.post<any>(this.baseURL, emailData);
  }

  enviarCorreoConAdjunto(correoDestinatario: string, asunto: string, contenido: string, contenidoAdjunto: string): Observable<any> {
    const emailData = {
      to: correoDestinatario,
      subject: asunto,
      text: contenido,
      attachment: contenidoAdjunto // Suponiendo que en el backend se espera un campo 'attachment' para el archivo adjunto
    };
    return this.httpClient.post<any>(this.baseURL, emailData);
  }
}

