import nodemailer from 'nodemailer';
import { envs } from '../../plugins/envs.adapter';

interface SendMailOptions {
  to: string;
  subject: string;
  htmlBody: string;
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
      const { to, subject, htmlBody } = options;
      const response = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
      })

      console.log( response );

      return true;
    } catch (error: any) {
      console.error(error);

      return false;
    }
  }

} 