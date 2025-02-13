import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repositories/log.repository";

interface CheckServiceUseCase {
  execute( url: string ): Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase {

  constructor(
    private readonly logRepository: LogRepository, 
  ) { }

  async execute( url: string ): Promise<boolean> {
    try {
      const response = await fetch( url );

      if ( !response.ok ) {
        throw new Error( 'URL_NOT_FOUND' );
      }

      console.log(`Connection with ${ url } is OK`);
      const log = new LogEntity( LogSeverityLevel.LOW, `Connection with ${ url } is OK` );

      this.logRepository.saveLog( log );

      return true;
    } catch ( error: any ) {
      console.error( `Cannot connect with ${ url }` );

      const log = new LogEntity( LogSeverityLevel.HIGH, `Cannot connect with ${ url }` );
      this.logRepository.saveLog( log );

      return false;
    }

  }

}

