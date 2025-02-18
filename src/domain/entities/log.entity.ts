export enum LogSeverityLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt: Date;
  origin: string;
}



/**
 * LogEntity representa los datos de un log.
 */
export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;
  public origin: string;

  /**
   * Setea los valores de la entidad Log
   * @param level log level
   * @param message message to be logged
   */
  constructor( options: LogEntityOptions ) {
    const { level, message, origin, createdAt } = options;
    this.level = level;
    this.message = message;
    this.origin = origin;
    this.createdAt = createdAt || new Date();
  }

  static fromJson( json: string ): LogEntity {
    const { level, message, createdAt, origin } = JSON.parse(json);

    const options: LogEntityOptions = {
      level,
      message,
      createdAt,
      origin
    }

    return new LogEntity( options );
  }
}