import nodemailer from 'nodemailer';
import { envs } from '../../plugins/envs.adapter';


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
      const response = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments: attachements || [],
      })

      this.generateHTML( attachements || [] );
      
      return true;
    } catch (error: any) {
      console.error(error);

      return false;
    }
  }

  async generateHTML( attachements: Attachement[] ): Promise<string> {
    return '<h1>Corregir el código</h1>';
  }
} 