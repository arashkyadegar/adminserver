import { MongoDb } from "../config/mongodb";
import { FaqEntity } from "../faq/faqEntity";
import { FaqWbDalLogger } from "../logger/faqLogger";

export interface FaqWbDal {
  findAll(): Promise<FaqEntity[]>;
}

export class FaqWbDalConc implements FaqWbDal {
  logger: any;
  constructor() {
    this.logger = new FaqWbDalLogger();
  }
  async findAll(): Promise<FaqEntity[]> {
    let result;
    try {

      const db = await MongoDb.dbconnect();
      result = await db.collection('faqs').find()
        .sort({ priority: -1, createdAt: -1 }).toArray();
      return result;
    } catch (err: any) {
      this.logger.logError(err, "getAll");
    } finally {
      MongoDb.dbclose();
    }
    return result;
  }
}
