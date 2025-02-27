import { appendFileSync, mkdirSync, readFileSync } from "fs";
import { LogDataSource } from "domain/datasources/log.datasource";
import { LogEntity } from "../../domain/entities/log.entity"; // TODO: revisar import
import { LogSeverityLevel } from 'common/types';

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath: string = 'logs/';
  private readonly allLogsPath: string = 'logs/logs-low.log';
  private readonly mediumLogsPath: string = 'logs/logs-medium.log';
  private readonly highLogsPath: string = 'logs/logs-high.log';

  constructor() {
    mkdirSync( this.logPath, { recursive: true } );
  }

  /**
   * Crea una entidad de log
   * @param options Atributos de la entidad de log
   * @returns Entidad de log
   */
  createOneLog(options: LogEntity): LogEntity {
    return new LogEntity(options);
  }

  /**
   * Guarda un log en el sistema de archivos
   * @param newLog Entidad de log a guardar
   */
  saveOneLog( newLog: LogEntity ): Boolean {
    const logAsJson = JSON.stringify(newLog) + '\n';

    switch ( newLog.level ) {
      case  'LOW':
        appendFileSync( this.allLogsPath, logAsJson, { flag: 'a+' } );
        return true;
      case 'MEDIUM' :
        appendFileSync( this.mediumLogsPath, logAsJson, { flag: 'a+' } );
        return true;
      case 'HIGH' :
        appendFileSync( this.highLogsPath, logAsJson, { flag: 'a+' } );
        return true;
      default:
        throw new Error(`${ newLog.level } NOT IMPLEMENTED`);
    }
  }

  /**
   * Obtiene los logs de un nivel de severidad específico
   * @param severityLevel Nivel de severidad de los logs a obtener
   * @returns Lista de logs
   */
  async getLogsBySeverityLevel(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    switch ( severityLevel ) {
      case 'LOW' :
        return this.getLogsFromFile(this.allLogsPath) ;
      case 'MEDIUM' :
        return this.getLogsFromFile(this.mediumLogsPath) ;
      case 'HIGH' :
        return this.getLogsFromFile(this.highLogsPath) ;
      default:
        throw new Error(` ${ severityLevel } NOT IMPLEMENTED `);
    }
  }

  private getLogsFromFile ( path: string ): LogEntity[] {
    const content = readFileSync( path, 'utf-8' );
    const stringLogs = content.split('\n')
                              .map( log => LogEntity.fromJson(log) );

    return stringLogs;
  }
}