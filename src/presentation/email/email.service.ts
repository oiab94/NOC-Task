import nodemailer from 'nodemailer';
import { envs } from 'plugins/envs.adapter';
import { LogRepository } from 'domain/repositories/log.repository';
import { LogEntity } from 'domain/entities/log.entity';


interface Attachement {
  filename: string;
  path: string;
}

interface SendMailOptions {
  to: string;
  subject: string;
  htmlBody: string;
  attachements?: Attachement[];
}

export class EmailService {

  constructor(
    private readonly logRepository: LogRepository,
  ) { }
  
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
  });

  async sendMail( options: SendMailOptions ): Promise<boolean> {
    try {
      const { to, subject, htmlBody, attachements } = options;
      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments: attachements || [],
      })

      // * LOGEAR EL ENVIO DE CORREO
      const log = new LogEntity({
        origin: 'email.service.ts',
        message:  `Email enviado a ${to} con asunto ${subject}`,
        level: 'LOW',
        createdAt: new Date(),
      }); 
      this.logRepository.saveOneLog( log );

      console.log(`Email enviado a ${to} con asunto ${subject}`);
      
      return true;
    } catch (error: any) {
      // * LOGEAR EL ERROR
      const log = new LogEntity({
        origin: 'email.service.ts',
        message:  error.message,
        level: 'HIGH',
        createdAt: new Date(),
      }); 
      this.logRepository.saveOneLog( log );

      console.error(error);

      return false;
    }
  }

  async generateHTML( attachements: Attachement[] ): Promise<string> {
    return '<h1>Corregir el código</h1>';
  }
} 