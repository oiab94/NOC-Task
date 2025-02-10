import { CronAdapter } from '../plugins/cron.adapter';

export class Server {

  static start() {
    const cronAdapter = new CronAdapter();
    const job = cronAdapter.createNewJob({
      cronTime: '* * * * * *',
      onTick: () => { console.log('Hello, world!') },
      start: true,
      timeZone: 'America/Sao_Paulo'
    });

    job.start();
  }

}