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

      // * SAVE LOG
      const message = `Connection with ${ url } is OK`;
      const logOptions = {
        level: LogSeverityLevel.LOW,
        message,
        origin: 'check-service.ts',
        createdAt: new Date()
      }
      const log = new LogEntity( logOptions );

      this.logRepository.saveLog( log );
      console.log( message );

      return true;
    } catch ( error: any ) {
      const fileName = __filename.split('\NOC-Task').pop();

      const message = error.message || 'URL_NOT_FOUND';
      const logOptions = {
        level: LogSeverityLevel.HIGH,
        message,
        origin: fileName || 'check-service.ts',
        createdAt: new Date()
      }
      const log = new LogEntity( logOptions );
      this.logRepository.saveLog( log );
      console.log( message );

      return false;
    }

  }

}

