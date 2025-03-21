import { LoggerInterface, LoggerType } from 'common/types';
import { pino } from 'pino'


export class LoggerAdapter implements LoggerInterface {
  private logger;
  private prettyOptions = { colorize: true } ;
  private options = {
    transport: { target: 'pino-pretty', options: this.prettyOptions}
  } 

  constructor(){
    this.logger = pino( this.options );
  }

  private formatMessage ( message: LoggerType ): string | number {
    return typeof message === 'object' ? JSON.stringify( message ) : message ;
  }

  public info (message: LoggerType): void {
    this.logger.info( this.formatMessage( message ) )
  };

  public error (message: LoggerType): void {
    this.logger.error( this.formatMessage( message ) )
  };

  public warn (message: LoggerType): void {
    this.logger.warn( this.formatMessage( message ) )
  };

  public debug (message: LoggerType): void {
    this.logger.warn( this.formatMessage( message ) )
  };
}