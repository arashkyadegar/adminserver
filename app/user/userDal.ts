import { UserEntity } from "./userEntity";
import { TicketDalConcLogger } from "../logger/ticketLogger";
import { MongoDb } from "../config/mongodb";
import { parseToObjectId } from "../utility/objectIdParser";
import { UserDalConcLogger } from "../logger/userLogger";

export interface UserDal {
  updateOne(id: string, entity: UserEntity): Promise<UserEntity>;
  findOne(id: string): Promise<UserEntity[]>;
  findOneByEmail(email: string): Promise<UserEntity[]>;
  createOne(entity: UserEntity): Promise<UserEntity>;
  deleteOne(id: string): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findAllByPages(page: number): Promise<any>;
  findAllByGroup(groupId: string): Promise<UserEntity[]>;
}
export class UserDalConc implements UserDal {
  logger: any;
  rowInPages: number = 10
  constructor() {
    this.logger = new UserDalConcLogger();
  }
  findOne(id: string): Promise<UserEntity[]> {
    throw new Error("Method not implemented.");
  }
  findAllByPages(page: number): Promise<any> {
    throw new Error("Method not implemented.");
  }
  findAllByGroup(groupId: string): Promise<UserEntity[]> {
    throw new Error("Method not implemented.");
  }

  updateOne(id: string, entity: UserEntity): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }



  async findOneByEmail(email: string): Promise<UserEntity[]> {
    let result;
    try {
      const db = await MongoDb.dbconnect();
      result = await db.collection('users').find({ email: email }).toArray();
    } catch (err: any) {
      this.logger.logError(err, "findOne");
    }
    return result;
  }


  async createOne(entity: UserEntity): Promise<UserEntity> {
    let result;
    try {
      const db = await MongoDb.dbconnect();
      result = await db.collection('users').insertOne({
        email: entity.email,
        mobile: entity.mobile,
        name: entity.name,
        picture: entity.picture,
        password: entity.password,
        roles: entity.roles,
        createdAt: Date.now(),
      });
    } catch (err: any) {
      this.logger.logError(err, "createOne");
    } finally {
      MongoDb.dbclose();
      return result;
    }
  }


  async deleteOne(id: string): Promise<UserEntity> {
    let result;
    try {
      const objectId = parseToObjectId(id);
      const db = await MongoDb.dbconnect();
      result = await db.collection('users').findOneAndDelete({
        _id: objectId,
      });
    } catch (err: any) {
      this.logger.logError(err, "deleteOne");
    } finally {
      MongoDb.dbclose();
      return result;
    }
  }


  async findAll(): Promise<UserEntity[]> {
    console.log('called')
    let result: UserEntity[] = [];
    try {
      const db = await MongoDb.dbconnect();
      result = await db.collection('users').aggregate([
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
