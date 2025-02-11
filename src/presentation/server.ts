import { CronAdapter } from '../plugins/cron.adapter';
import { CheckService } from '../domain/use-cases/checks/check-service';

export class Server {

  static start() {
    const checkService = new CheckService();

    CronAdapter.executeNewJob(
      '*/5 * * * * *',
      async () => await checkService.execute('https://google.com')
    );
  }

}