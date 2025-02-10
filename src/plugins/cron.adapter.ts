import { CronJob } from 'cron';

interface CronJobParamenters {
  cronTime: string;
  onTick: () => void;
  start: boolean;
  timeZone: string;
}

export class CronAdapter {

  public createNewJob( options: CronJobParamenters ) {
    const { cronTime, onTick, start, timeZone } = options;

    return CronJob.from( {
      cronTime: cronTime,
      onTick: onTick,
      start: start,
      timeZone: timeZone
    } );
  }

}