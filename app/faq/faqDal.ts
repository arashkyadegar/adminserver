import { FaqEntity } from "./faqEntity";
import { FaqDalConcLogger } from "../logger/faqLogger";
import { MongoDb } from "../config/mongodb";
import { parseToObjectId } from "../utility/objectIdParser";

export interface FaqDal {
  updateOne(id: string, entity: FaqEntity): Promise<boolean>;
  findOne(id: string): Promise<FaqEntity>;
  createOne(entity: FaqEntity): Promise<boolean>;
  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<FaqEntity[]>;
}
export class FaqDalConc implements FaqDal {
  logger: any;
  constructor() {
    this.logger = new FaqDalConcLogger();
  }

  async updateOne(id: string, entity: FaqEntity): Promise<any> {
    try {
      const db = await MongoDb.dbconnect();
      const objectId = parseToObjectId(id);
      const result = await db.collection('faqs').updateOne({
        _id: objectId,
      },
        {
          $set: {
            groupId: 0,
            question: entity.question,
            answer: entity.answer,
            display: entity.display,
            priority: entity.priority,
            updatedAt: Date.now(),
          },
        });
      return result;
    } catch (err: any) {
      this.logger.logError(err, "updateOne");
    } finally {
      MongoDb.dbclose();
    }
  }

  async findOne(id: string): Promise<FaqEntity> {
    let result;
    try {
      const objectId = parseToObjectId(id);
      const db = await MongoDb.dbconnect();
      result = await db.collection('faqs').find({ _id: objectId }).toArray();
    } catch (err: any) {
      this.logger.logError(err, "findOne");
    }
    return result;
  }


  async createOne(entity: FaqEntity): Promise<any> {
    try {
      const db = await MongoDb.dbconnect();
      const result = await db.collection('faqs').insertOne({
        groupId: 0,
        question: entity.question,
        answer: entity.answer,
        display: entity.display,
        priority: entity.priority,
        createdAt: Date.now(),
      });
      return result;
    } catch (err: any) {
      this.logger.logError(err, "createOne");
    } finally {
      MongoDb.dbclose();
    }
  }


  async deleteOne(id: string): Promise<any> {
    let result;
    try {
      const objectId = parseToObjectId(id);
      const db = await MongoDb.dbconnect();
      result = await db.collection('faqs').deleteOne({
        _id: objectId,
      });

      return result;
    } catch (err: any) {
      this.logger.logError(err, "deleteOne");
    } finally {
      MongoDb.dbclose();
    }
  }


  async findAll(): Promise<FaqEntity[]> {
    let result;
    try {

      const db = await MongoDb.dbconnect();
      result = await db.collection('faqs').find()
        .sort({ createdAt: -1 }).toArray();
      return result;
    } catch (err: any) {
      this.logger.logError(err, "getAll");
    } finally {
      MongoDb.dbclose();
    }
    return result;
  }
}
