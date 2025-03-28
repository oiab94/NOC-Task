import { MongoConnectionOption, MongoDatabase } from "common/types";
import mongoose from "mongoose"; 

export class MongoDB implements MongoDatabase {
  static async connect( url: string, options: MongoConnectionOption ): Promise< boolean > {
    try {

      await mongoose.connect( url, options )

      return true;
    } catch ( error: unknown ) {
      throw error ;
    }
  };

}