import { LogEntity } from '../../entities/log.entity';
import * as nodemailer from 'nodemailer';
import { envs } from '../../../plugins/envs.adapter';
import { EmailServiceUseCase, SendMailOptions } from '../../../common/types'
import { LogRepository } from 'domain/repositories/log.repository';

export class EmailService implements EmailServiceUseCase {
  private fileName = 'email.service.ts';
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(
    //TODO: Implementar transporte de nodemailer
    private readonly logRepository: LogRepository,
  ) { }

  async sendMail( options: SendMailOptions ): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        to: options['to'],
        subject: options['subject'],
        html: options['htmlBody'],
        attachments: options['attachements'] || [],
      })

      const log = this.logRepository.createOneLog({
        level: 'LOW',
        message: `Email enviado a ${ options['to'] }`,
        createdAt: new Date(),
        origin: this.fileName,
      })

      this.logRepository.saveOneLog( log );

      console.log( LogEntity.toJson( log ) );

      return true;
    } catch ( error: any ) {
      this.logRepository.saveOneLog({
        level: 'HIGH',
        message: error.message,
        createdAt: new Date(),
        origin: 'email.service.ts',
      });
      
      this.logRepository.saveOneLog({
        level: 'HIGH',
        message: error.message,
        createdAt: new Date(),
        origin: 'email.service.ts',
      })

      return false;
    }
  }

}