interface CheckServiceUseCase {
  execute( url: string ): Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase {

  async execute( url: string ): Promise<boolean> {
    try {
      const response = await fetch( url );

      if ( !response.ok ) {
        throw new Error( 'URL_NOT_FOUND' );
      }

      console.log(`Connection with ${ url } is OK`);
      return true;
    } catch ( error: any ) {
      console.error( error.message );
      return false;
    }

  }

}

