import { MongoDb } from "../config/mongodb";
import { IBaseLogger } from "../logger/iBaseLogger";
import {BrandWbDalLogger } from "../logger/brandLogger";

export interface BrandWbDal {
  findAll(): Promise<any>;
}

export class BrandWbDalConc implements BrandWbDal {
  logger: IBaseLogger;
  constructor() {
    this.logger = new BrandWbDalLogger();
  }


  async findAll(): Promise<any> {
    let result;
    try {
      const db = await MongoDb.dbconnect();
      result = await db.collection('brands').find()
        .sort({ createdAt: -1 }).toArray();
      return result;
    } catch (err: any) {
      this.logger.logError(err, "findAll");
    } finally {
      MongoDb.dbclose();
    }
    return result;
  }


}


