import { MongoDb } from "../config/mongodb";
import { BrandEntity } from "./brandEntity";
import { IBaseLogger } from "../logger/iBaseLogger";
import { BrandDalConcLogger } from "../logger/brandLogger";
import { parseToObjectId } from "../utility/objectIdParser";

export interface BrandDal {
  findAll(): Promise<any>;
  findAllAbbrev(): Promise<any>;
  findOne(id: string): Promise<any>;
  search(name: string): Promise<any>;
  createOne(entity: BrandEntity): Promise<boolean>;
  updateOne(id: string, entity: BrandEntity): Promise<any>;
  deleteOne(id: string): Promise<boolean>;
}

export class BrandDalConc implements BrandDal {
  logger: IBaseLogger;
  constructor() {
    this.logger = new BrandDalConcLogger();
  }
  async search(name: string): Promise<any> {
    try {
      let result;

      const db = await MongoDb.dbconnect();
      result = await db.collection('brands').aggregate([
        { $match: { name: { $regex: name, $options: "i" } } },
        , {
          $project: {
            "_id": 1,
            "name": 1,
            "image": 1,
            "createdAt": 1,
          }
        }]).toArray();
      return result;
    } catch (err: any) {
      this.logger.logError(err, "search");
    } finally {
      MongoDb.dbclose();
    }
  }
  async updateOne(id: string, entity: BrandEntity): Promise<any> {
    try {
      const db = await MongoDb.dbconnect();
      const objectId = parseToObjectId(id);
      const result = await db.collection('brands').updateOne({
        _id: objectId,
      },
        {
          $set: {
            name: entity.name,
            image: entity.image,
            updatedAt: Date.now()
          },
        });
      return result;
    } catch (err: any) {
      this.logger.logError(err, "updateOne");
    } finally {
      MongoDb.dbclose();
    }
  }

  async deleteOne(id: string): Promise<any> {
    let result;
    try {
      const objectId = parseToObjectId(id);
      const db = await MongoDb.dbconnect();
      result = await db.collection('brands').deleteOne({
        _id: objectId,
      });

      return result;
    } catch (err: any) {
      this.logger.logError(err, "deleteOne");
    } finally {
      MongoDb.dbclose();
    }

  }
  async findAllAbbrev(): Promise<any> {
    let result;
    try {

      const db = await MongoDb.dbconnect();
      result = await db.collection('brands').aggregate([
        {
          $project: {
            "_id": 1,
            "name": 1
          }
        }
      ]).toArray();
      return result;
    } catch (err: any) {
      this.logger.logError(err, "findAllAbbrev");
    } finally {
      MongoDb.dbclose();
    }
    return result;
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

  async createOne(entity: BrandEntity): Promise<any> {
    try {
      const db = await MongoDb.dbconnect();
      const result = await db.collection('brands').insertOne({
        name: entity.name,
        image: entity.image,
        createdAt: Date.now()
      });
      return result;
    } catch (err: any) {
      this.logger.logError(err, "createOne");
    } finally {
      MongoDb.dbclose();
    }
  }

  async findOne(id: string): Promise<BrandEntity> {
    let result;
    try {
      const objectId = parseToObjectId(id);
      const db = await MongoDb.dbconnect();
      result = await db.collection('brands').find({ _id: objectId }).toArray();
    } catch (err: any) {
      this.logger.logError(err, "findOne");
    }
    return result;
  }

}


