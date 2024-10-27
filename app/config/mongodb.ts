import { MongoClient } from "mongodb";
import 'dotenv/config'

export class MongoDb {
     static client: MongoClient | undefined;
     private constructor() { }
     static async dbconnect(): Promise<any> {
          try {
               const dbUrl = process.env.MONGOOSE_URI;
               this.client = await MongoClient.connect(`${dbUrl}`);
               return this.client.db(process.env.DATABSE);
          } catch (err) {
               console.log(`err :${err}`)
          }

     }

     static async dbclose() {

          //  await this.client?.close()
     }

}