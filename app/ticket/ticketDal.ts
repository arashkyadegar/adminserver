import { TicketEntity } from "./ticketEntity";
import { TicketDalConcLogger } from "../logger/ticketLogger";
import { MongoDb } from "../config/mongodb";
import { parseToObjectId } from "../utility/objectIdParser";

export interface TicketDal {
  updateOne(id: string, entity: TicketEntity): Promise<TicketEntity>;
  findOne(id: string): Promise<TicketEntity[]>;
  createOne(entity: TicketEntity): Promise<TicketEntity>;
  deleteOne(id: string): Promise<TicketEntity>;
  findAll(): Promise<TicketEntity[]>;
  findAllByPages(page: number): Promise<any>;
  findAllByGroup(groupId: string): Promise<TicketEntity[]>;
}
export class TicketDalConc implements TicketDal {
  logger: any;
  rowInPages: number = 10
  constructor() {
    this.logger = new TicketDalConcLogger();
  }
  findAllByPages(page: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  findAllByGroup(groupId: string): Promise<TicketEntity[]> {
    throw new Error("Method not implemented.");
  }

  updateOne(id: string, entity: TicketEntity): Promise<TicketEntity> {
    throw new Error("Method not implemented.");
  }



  async findOne(id: string): Promise<TicketEntity[]> {

    let result;
    try {
      const objectId = parseToObjectId(id);
      const db = await MongoDb.dbconnect();
      result = await db.collection('tickets').find({ _id: objectId }).toArray();
    } catch (err: any) {
      this.logger.logError(err, "findOne");
    }
    return result;
  }


  async createOne(entity: TicketEntity): Promise<TicketEntity> {
    let result;
    try {
      const db = await MongoDb.dbconnect();
      result = await db.collection('tickets').insertOne({
        subject: entity.subject,
        body: entity.body,
        attachments: entity.attachments,
        categoryId: entity.categoryId,
        priority: entity.priority,
        status: entity.status,
        createdAt: Date.now(),
      });
    } catch (err: any) {
      this.logger.logError(err, "createOne");
    } finally {
      MongoDb.dbclose();
      return result;
    }
  }


  async deleteOne(id: string): Promise<TicketEntity> {
    let result;
    try {
      const objectId = parseToObjectId(id);
      const db = await MongoDb.dbconnect();
      result = await db.collection('tickets').findOneAndDelete({
        _id: objectId,
      });
    } catch (err: any) {
      this.logger.logError(err, "deleteOne");
    } finally {
      MongoDb.dbclose();
      return result;
    }
  }


  async findAll(): Promise<TicketEntity[]> {
    console.log('called')
    let result: TicketEntity[] = [];
    try {
      const db = await MongoDb.dbconnect();
      result = await db.collection('tickets').aggregate([
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
      console.log(err);
      this.logger.logError(err, "getAll");
    } finally {
      MongoDb.dbclose();
    }
    return result;
  }


}
