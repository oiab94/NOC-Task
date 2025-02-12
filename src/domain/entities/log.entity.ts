export enum LogSeverityLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}


/**
 * LogEntity representa los datos de un log.
 */
export class LogEntity {

  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  /**
   * Setea los valores de la entidad Log
   * @param level log level
   * @param message message to be logged
   */
  constructor( level: LogSeverityLevel, message: string ) {
    this.level = level;
    this.message = message;
    this.createdAt = new Date();
  }

  static fromJson( json: string ): LogEntity {
    const { level, message, createdAt } = JSON.parse(json);

    const log = new LogEntity( level, message );
    log.createdAt = new Date(createdAt);

    return log;
  }
}