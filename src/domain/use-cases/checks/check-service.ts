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
      const logOptions = {
        level: LogSeverityLevel.LOW,
        message: `Connection with ${ url } is OK`,
        origin: 'CheckService',
        createdAt: new Date()
      }
      const log = new LogEntity( logOptions );

      this.logRepository.saveLog( log );

      return true;
    } catch ( error: any ) {
      const fileName = __filename.split('\NOC-Task').pop();

      console.error( `Cannot connect with ${ url }` );

      const logOptions = {
        level: LogSeverityLevel.HIGH,
        message: `Cannot connect with ${ url }`,
        origin: fileName || 'CheckService',
        createdAt: new Date()
      }
      const log = new LogEntity( logOptions );
      this.logRepository.saveLog( log );

      return false;
    }

  }

}

