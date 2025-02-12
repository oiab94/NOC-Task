import { access, appendFileSync, open, readFileSync, writeFileSync } from "fs";
import { LogDataSource } from "../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../domain/entities/log.entity";

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath: string = 'logs/';
  private readonly allLogsPath: string = 'logs/logs-low.log';
  private readonly mediumLogsPath: string = 'logs/logs-medium.log';
  private readonly highLogsPath: string = 'logs/logs-high.log';

  constructor() { }

  saveLog( newLog: LogEntity ): void {
    const logAsJson = JSON.stringify(newLog) + '\n';
    appendFileSync( this.allLogsPath, logAsJson );

    switch ( newLog.level ) {
      case LogSeverityLevel.LOW :
        break ;
      case LogSeverityLevel.MEDIUM :
        appendFileSync( this.mediumLogsPath, logAsJson );
        break ;
      case LogSeverityLevel.HIGH :
        appendFileSync( this.highLogsPath, logAsJson );
        break ;
      default:
        throw new Error('Invalid log level');
    }
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch ( severityLevel ) {
      case LogSeverityLevel.LOW :
        return this.getLogsFromFile(this.allLogsPath) ;
      case LogSeverityLevel.MEDIUM :
        return this.getLogsFromFile(this.mediumLogsPath) ;
      case LogSeverityLevel.HIGH :
        return this.getLogsFromFile(this.highLogsPath) ;
      default:
        throw new Error(` ${severityLevel} not implemented `);
    }
  }

  private createLogsFiles () {
    [  
      this.allLogsPath,
      this.mediumLogsPath,
      this.highLogsPath,
    ].forEach( path => {
      open(path, 'wx', (err, _fd) => {
        if ( err ) {
          err.code === 'EEXIST' 
            ? console.log(`File ${path} already exists`) 
            : console.error(err); 
          return;
        }

        console.log(`File ${path} created`);
        writeFileSync( path, '' );
      })
    });
  }

  private getLogsFromFile ( path: string ): LogEntity[] {
    const content = readFileSync( path, 'utf-8' );
    const stringLogs = content.split('\n').map( log => LogEntity.fromJson(log) );

    return stringLogs;
  }
}