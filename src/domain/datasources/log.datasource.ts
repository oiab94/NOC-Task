import { LogSeverityLevel } from "common/types";
import { LogEntity } from "domain/entities/log.entity";

/**
 * LogDataSource define las reglas de negocio para el manejo de los logs.
 */
export abstract class LogDataSource {
  abstract createOneLog( options: LogEntity ): LogEntity;
  abstract saveOneLog( log: LogEntity ): Boolean ;
  abstract getLogsBySeverityLevel( severityLevel: LogSeverityLevel ): Promise< LogEntity[] >;
}