import { CronAdapter } from '../plugins/cron.adapter';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { LogRepositoryImplementation } from '../infraestructure/repositories/log.impl.repository';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { EmailService } from '../domain/use-cases/email/email-service'

const fileSystemLogRepository = new LogRepositoryImplementation( new FileSystemDataSource() );
export class Server {

  static start() {
    const checkService = new CheckService( fileSystemLogRepository );
    
    const emailService = new EmailService( fileSystemLogRepository );

    emailService.sendMail({
      to: 'oscar.alonso.994@gmail.com',
      subject: 'Test de mensaje de logs',
      htmlBody: `
        <h1>Logs de los servicios</h1>
        <h3>adsfasfweqertcvzxbnvdsfniosdfgkdngknsadogisdfgndisfgiodsngkdsiofgd</h3>
        `,
      attachements: [
        { filename: 'logs-low.log', path:'./logs/logs-low.log', }, 
        { filename: 'logs-high.log', path:'./logs/logs-high.log', }, 
      ]
    });
 
    
    //CronAdapter.executeNewJob(
    //  '*/5 * * * * *',
    //  async () => await checkService.execute('https://localhost:3000/')
    //);
    

  }

}