import { access, appendFileSync, mkdirSync, open, readFileSync, writeFileSync } from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath: string = 'logs/';
  private readonly allLogsPath: string = 'logs/logs-low.log';
  private readonly mediumLogsPath: string = 'logs/logs-medium.log';
  private readonly highLogsPath: string = 'logs/logs-high.log';

  constructor() {
    mkdirSync( this.logPath, { recursive: true } );
  }

  /**
   * Guarda un log en el sistema de archivos
   * @param newLog Entidad de log a guardar
   */
  saveLog( newLog: LogEntity ): void {
    const logAsJson = JSON.stringify(newLog) + '\n';

    switch ( newLog.level ) {
      case LogSeverityLevel.LOW :
        appendFileSync( this.allLogsPath, logAsJson, { flag: 'a+' } );
        break ;
      case LogSeverityLevel.MEDIUM :
        appendFileSync( this.mediumLogsPath, logAsJson, { flag: 'a+' } );
        break ;
      case LogSeverityLevel.HIGH :
        appendFileSync( this.highLogsPath, logAsJson, { flag: 'a+' } );
        break ;
      default:
        throw new Error('Invalid log level');
    }
  }

  /**
   * Obtiene los logs de un nivel de severidad específico
   * @param severityLevel Nivel de severidad de los logs a obtener
   * @returns Lista de logs
   */
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

  private getLogsFromFile ( path: string ): LogEntity[] {
    const content = readFileSync( path, 'utf-8' );
    const stringLogs = content.split('\n')
                              .map( log => LogEntity.fromJson(log) );

    return stringLogs;
  }
}