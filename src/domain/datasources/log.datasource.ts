import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

/**
 * LogDataSource define las reglas de negocio para el manejo de los logs.
 */
export abstract class LogDataSource {
  abstract saveLog( log: LogEntity ): void ;
  abstract getLogs( severityLevel: LogSeverityLevel ): Promise< LogEntity[] >;
}