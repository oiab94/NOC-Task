import { LogSeverityLevel, LogEntityOptions } from 'common/types'
import { LogEntity } from "domain/entities/log.entity";

/**
 * LogRepository define las reglas de negocio para el manejo de los logs entre 
 * la capa de infraestructura y la capa de dominio.
 */
export abstract class LogRepository {
  abstract createOneLog( options: LogEntityOptions ): LogEntity;
  abstract saveOneLog( log: LogEntity ): void ;
  abstract getLogsBySeverityLevel( severityLevel: LogSeverityLevel ): Promise< LogEntity[] >;
}