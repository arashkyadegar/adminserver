import { MongoClient } from "mongodb";
import 'dotenv/config'

export class MongoDb {
     static client: MongoClient | undefined;
     private constructor() { }
     static async dbconnect(): Promise<any> {
          const dbUrl = process.env.MONGOOSE_URI;
          this.client = await MongoClient.connect(`${dbUrl}`);
          return this.client.db('admindb');
     }

     static async dbclose() {
          this.client?.close()
     }

}