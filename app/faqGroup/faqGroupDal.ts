import { FaqGroupEntity } from "./faqGroupEntity";
import { FaqGroupDalConcLogger } from "../logger/faqLogger";
import { MongoDb } from "../config/mongodb";
import { parseToObjectId } from "../utility/objectIdParser";

export interface FaqGroupDal {
  updateOne(id: string, entity: FaqGroupEntity): Promise<boolean>;
  findOne(id: string): Promise<FaqGroupEntity>;
  createOne(entity: FaqGroupEntity): Promise<boolean>;
  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<FaqGroupEntity[]>;
}
export class FaqGroupDalConc implements FaqGroupDal {
  logger: any;
  constructor() {
    this.logger = new FaqGroupDalConcLogger();
  }

  async updateOne(id: string, entity: FaqGroupEntity): Promise<any> {
    try {
      const db = await MongoDb.dbconnect();
      const objectId = parseToObjectId(id);
      const result = await db.collection('faqGroups').updateOne({
        _id: objectId,
      },
        {
          $set: {
            name: entity.name,
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

  async findOne(id: string): Promise<FaqGroupEntity> {
    let result;
    try {
      const objectId = parseToObjectId(id);
      const db = await MongoDb.dbconnect();
      result = await db.collection('faqGroups').find({ _id: objectId }).toArray();
    } catch (err: any) {
      this.logger.logError(err, "findOne");
    }
    return result;
  }


  async createOne(entity: FaqGroupEntity): Promise<any> {
    try {
      const db = await MongoDb.dbconnect();
      const result = await db.collection('faqGroups').insertOne({
        name: entity.name,
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
      result = await db.collection('faqGroups').deleteOne({
        _id: objectId,
      });

      return result;
    } catch (err: any) {
      this.logger.logError(err, "deleteOne");
    } finally {
      MongoDb.dbclose();
    }
  }


  async findAll(): Promise<FaqGroupEntity[]> {
    let result;
    try {

      const db = await MongoDb.dbconnect();
      result = await db.collection("faqGroups").aggregate([
        {
          $lookup: {
            from: "faqs",
            localField: "_id",
            foreignField: "groupId",
            as: "faqs",
          }
        }]).sort({ priority: -1, createdAt: -1 }).toArray()
      return result;
    } catch (err: any) {
      this.logger.logError(err, "getAll");
    } finally {
      MongoDb.dbclose();
    }
    return result;
  }
}
