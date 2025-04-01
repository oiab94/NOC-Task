// ! Los environments deben ser cargado primeramente por sobre todo
import { MongoDB } from '../config/database/mongo-db';
import { envs } from '../plugins/envs.adapter';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { EmailService } from '../domain/use-cases/email/email-service';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';
import { LogRepositoryImplementation } from '../infraestructure/repositories/log.impl.repository';
import { LoggerAdapter } from '../plugins/logger.adapter';

const fileSystemLogRepository = new LogRepositoryImplementation( new FileSystemDataSource() );
const loggerService = new LoggerAdapter();
const checkService = new CheckService( fileSystemLogRepository, loggerService );
const emailService = new EmailService( fileSystemLogRepository, loggerService );

export class Server {
  private static fileName = 'server.ts';

  static async start() {
    loggerService.info('------- SERVER STARTED -------');

    await this.connectDatabase();
    // TODO: mejorar la forma de tirar los errores
    await this.runCheckService();
    await this.sendEmail();
    await this.executeCronjob();
    
    loggerService.info('------- SERVER STOPPED -------');
  }

  /**
   * CONNECT WITH DATABASE
   */
  private static async connectDatabase() {
    try {
      await MongoDB.connect( envs.MONGO_URL, {
        dbName: envs.MONGO_DB_NAME,
        user: envs.MONGO_USERNAME,
        pass: envs.MONGO_PASSWORD,
      } )

      loggerService.info(`[${ this.fileName }] - ${ this.connectDatabase.name } - Executed Successfully `);
    } catch (error) {
      loggerService.error(`Database connection failed ${ error }`);

      throw error;
    }
  }

  /**
   * CHECK SERVICE 
   * */
  private static async runCheckService() {
    try {
      await checkService.execute('https://localhost:3001/')

      loggerService.info(`[${ this.fileName }] - ${ this.runCheckService.name } - Executed Successfully `);
    } catch (error) {
      loggerService.error(`[${ this.fileName }]: ERROR ${ error }`);

      throw error;
    }
  }
  
  /**
   * SEND EMAIL
   */
  private static async sendEmail() {
    // TODO: Generar los ficheros previos
    // await emailService.sendMail({
    //   to: 'oscar.alonso.994@gmail.com',
    //   subject: 'Test de mensaje de logs',
    //   htmlBody: `
    //     <h1>Logs de los servicios</h1>
    //     <h3>adsfasfweqertcvzxbnvdsfniosdfgkdngknsadogisdfgndisfgiodsngkdsiofgd</h3>
    //     `,
    //   attachements: [
    //     { filename: 'logs-low.log', path:'./logs/logs-low.log', }, 
    //     { filename: 'logs-high.log', path:'./logs/logs-high.log', }, 
    //   ]
    // });
  }

  /**
   * CRON JOBS
   */
  private static async executeCronjob() {
    //CronAdapter.executeNewJob(
    //  '*/5 * * * * *',
    //  async () => await checkService.execute('https://localhost:3000/')
    //);
  }
}