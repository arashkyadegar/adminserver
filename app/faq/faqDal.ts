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
  findAllByPages(page: number): Promise<any>;
  findAllByGroup(groupId: string): Promise<FaqEntity[]>;
}
export class FaqDalConc implements FaqDal {
  logger: any;
  rowInPages: number = 10
  constructor() {
    this.logger = new FaqDalConcLogger();
  }

  async updateOne(id: string, entity: FaqEntity): Promise<any> {
    try {
      const db = await MongoDb.dbconnect();
      const objectId = parseToObjectId(id);
      const objectGroupId = parseToObjectId(entity.groupId);
      const result = await db.collection('faqs').updateOne({
        _id: objectId,
      },
        {
          $set: {
            groupId: objectGroupId,
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
      const objectGroupId = parseToObjectId(entity.groupId);
      const result = await db.collection('faqs').insertOne({
        groupId: objectGroupId,
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
      result = await db.collection('faqs').aggregate([
        {
          $lookup: {
            from: "faqGroups",
            localField: "groupId",
            foreignField: "_id",
            as: "group",
          }
        }, { $addFields: { group: { $first: "$group" } } }
      ]).sort({ priority: -1, createdAt: -1 }).toArray()
      return result;
    } catch (err: any) {
      this.logger.logError(err, "getAll");
    } finally {
      MongoDb.dbclose();
    }
    return result;
  }

  async findAllByPages(page: number): Promise<any> {
    let result;
    try {
      let skipNumber = (page - 1) * this.rowInPages;
      const db = await MongoDb.dbconnect();
      result = await db.collection('faqs').aggregate([
        {
          $lookup: {
            from: "faqGroups",
            localField: "groupId",
            foreignField: "_id",
            as: "group",
          }
        }, { $addFields: { selected: false } },
        { $setWindowFields: { output: { totalCount: { $count: {} } } } },
        { $skip: skipNumber },
        { $limit: this.rowInPages }, { $addFields: { group: { $first: "$group" } } }
      ]).sort({ priority: -1, createdAt: -1 }).toArray()
      return result;
    } catch (err: any) {
      this.logger.logError(err, "getAll");
    } finally {
      MongoDb.dbclose();
    }
    return result;
  }


  async findAllByGroup(groupId: string): Promise<FaqEntity[]> {
    let result;
    try {
      const objectGroupId = parseToObjectId(groupId);
      const db = await MongoDb.dbconnect();
      result = await db.collection('faqs').find({ groupId: groupId }).toArray();
      return result;
    } catch (err: any) {
      this.logger.logError(err, "getAll");
    } finally {
      MongoDb.dbclose();
    }
    return result;
  }
}
