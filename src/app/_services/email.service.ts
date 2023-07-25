import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {}

  private readonly SERVICE_ID = 'service_hpvubga'; // Reemplaza 'your_emailjs_service_id' por el ID de tu servicio de EmailJS
  private readonly TEMPLATE_ID = 'template_12lmzws'; // Reemplaza 'your_emailjs_template_id' por el ID de tu plantilla de correo en EmailJS
  private readonly USER_ID = '8985ITgp1mBh3AlOt'; // Reemplaza 'your_emailjs_user_id' por tu User ID de EmailJS
 
  enviarFacturaPorCorreo(correoDestinatario: string, asunto: string, contenido: string) {
    emailjs.send('service_hpvubga', 'template_csorl8d', {
      to_email: correoDestinatario,
      subject: asunto,
      message: contenido
    }).then(
      (response: EmailJSResponseStatus) => {
       
      },
      (error) => {
       
      }
    );
  }


  enviarCorreo(correoDestinatario: string, asunto: string, contenido: string) {
    const params = {
      to_email: correoDestinatario,
      subject: asunto,
      message: contenido
    };
  
    emailjs.send(this.SERVICE_ID, this.TEMPLATE_ID, params, this.USER_ID)
      .then(response => console.log('Correo enviado correctamente', response))
      .catch(error => console.error('Error al enviar el correo', error));
  }  
  
}