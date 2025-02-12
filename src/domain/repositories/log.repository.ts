import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

/**
 * LogRepository define las reglas de negocio para el manejo de los logs entre 
 * la capa de infraestructura y la capa de dominio.
 */
export abstract class LogRepository {
  abstract saveLog( log: LogEntity ):  void ;
  abstract getLogs( severityLevel: LogSeverityLevel ): Promise< LogEntity[] >;
}