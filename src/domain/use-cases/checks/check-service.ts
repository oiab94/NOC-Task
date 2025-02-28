import { CheckServiceUseCase } from 'common/types';
import { LogRepository } from "domain/repositories/log.repository";
import { LogEntity } from "../../entities/log.entity";


export class CheckService implements CheckServiceUseCase {
  private fileName = 'check-service.ts';

  constructor(
    private readonly logRepository: LogRepository, 
  ) { }

  async execute( url: string ): Promise< boolean > {
    try {
      await this.processTheUrl( url ); 

      const log = this.logRepository.createOneLog({
        level: 'LOW',
        message: `CONNECT WITH ${ url } OK`,
        createdAt: new Date(),
        origin: this.fileName,
      });

      this.logRepository.saveOneLog( log );

      console.log( LogEntity.toJson( log ) );

      return true;
    } catch ( error: any ) {
      const errorLog = this.logRepository.createOneLog({
        level: 'HIGH', 
        message: `URL ${ url } NOT FOUND` ,
        createdAt: new Date(),
        origin: this.fileName,
      });

      this.logRepository.saveOneLog( errorLog );

      console.log( LogEntity.toJson( errorLog ) );

      return false;
    }
  }

  private async processTheUrl( url: string ): Promise< Response > { 
    return await fetch( url );
  }

}

