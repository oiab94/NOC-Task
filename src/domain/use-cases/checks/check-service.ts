import { CheckServiceUseCase, LogEntityOptions } from 'common/types';
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "domain/repositories/log.repository";


export class CheckService implements CheckServiceUseCase {

  constructor(
    private readonly logRepository: LogRepository, 
  ) { }

  async execute( url: string ): Promise< boolean > {
    try {
      const response = await fetch( url );

      console.log(response);
      

      if ( !response.ok ) { 
        throw new Error( `FETCH FAILED WITH ${ url } URL` ); 
      }

      console.log( { 
        status: response.ok, 
        statusCode: response.statusText,
        mesage: `CONNECT WITH ${ url } SUCCESSFULLY`, 
        fileName: 'check-service.ts',
      }  );

      return true;
    } catch ( error: any ) {
      const errorMessage = error instanceof Error ? error.message : `FETCH FAILED WITH ${ url } URL`;
      console.error( { 
        status: false, 
        mesage: `URL ${ url } NOT FOUND` ,
        message: errorMessage,
        fileName: 'check-service.ts',
      }  );

      return false;
    }

  }

  private createOneLog( options: LogEntityOptions  ): LogEntity  {
    return new LogEntity( options );
  }

  private saveOneLog( log: LogEntity ): Boolean {
    return this.logRepository.saveOneLog( log );
  }
}

