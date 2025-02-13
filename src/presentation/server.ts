import { CronAdapter } from '../plugins/cron.adapter';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { LogRepositoryImplementation } from '../infraestructure/repositories/log.impl.repository';
import { FileSystemDataSource } from '../infraestructure/datasources/file-system.datasource';

const fileSystemLogRepository = new LogRepositoryImplementation( new FileSystemDataSource() );
export class Server {

  static start() {
    const checkService = new CheckService( fileSystemLogRepository );

    CronAdapter.executeNewJob(
      '*/5 * * * * *',
      async () => await checkService.execute('https://localhost:3000')
    );
  }

}