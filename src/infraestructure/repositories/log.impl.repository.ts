import { LogEntityOptions, LogSeverityLevel } from "common/types";
import { LogDataSource } from "domain/datasources/log.datasource";
import { LogEntity } from "domain/entities/log.entity";
import { LogRepository } from "domain/repositories/log.repository";

/**
 * La implementación de la interfaz LogRepository es la responsable de 
 * conectar la capa de infraestructura con la capa de dominio. Por medio
 * de la inyeección de dependencias, se conecta con el datasource que corresponda.
 * Esot permite que cualquier datasource pueda ser utilizado por la aplicación, 
 * siempre y cuando cumpla con la regla de negocio de LogRepository.
 */
export class LogRepositoryImplementation implements LogRepository {
  // Inyeccion de dependencias
  constructor( 
    private readonly logDataSource: LogDataSource,
  ) {}

  createOneLog( log: LogEntityOptions ): LogEntity {
    return this.logDataSource.createOneLog( log );
  }

  saveOneLog(log: LogEntity): void {
    this.logDataSource.saveOneLog( log );
  }
  getLogsBySeverityLevel( severityLevel: LogSeverityLevel ): Promise< LogEntity[] > {
    return this.logDataSource.getLogsBySeverityLevel(severityLevel);
  }

}