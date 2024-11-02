import { IBaseLogger } from "../logger/iBaseLogger";
import { ImageDalConcLogger } from "../logger/imageLogger";
import { ImageEntity, ImageListEntity } from "./imageEntity";
import { MongoDb } from "../config/mongodb";
import { parseToObjectId } from "../utility/objectIdParser";

export interface ImageDal {
  findAll(): Promise<any>;
  findAllByPages(page: number): Promise<any>;
  findOne(id: string): Promise<any>;
  search(name: string, page: number): Promise<any>;
  createOne(entity: ImageEntity): Promise<ImageEntity>;
  createMany(entities: ImageListEntity): Promise<ImageListEntity>;
  updateOne(id: string, entity: ImageEntity): Promise<ImageEntity>;
  deleteOne(id: string): Promise<boolean>;
}

export class ImageDalConc implements ImageDal {
  logger: IBaseLogger;
  rowInPages: number = 10
  constructor() {
    this.logger = new ImageDalConcLogger();
  }
  async createMany(entities: ImageListEntity): Promise<ImageListEntity> {
    let result;
    try {
      const db = await MongoDb.dbconnect();
      result = await db.collection('images').insertMany(entities.images);
      return result;
    } catch (err: any) {
      this.logger.logError(err, "createMany");
    } finally {
      MongoDb.dbclose();
      return result;
    }
  }
  async search(name: string, page: number): Promise<any> {
    try {
      let result;
      let skipNumber = (page - 1) * this.rowInPages;
      const db = await MongoDb.dbconnect();
      result = await db.collection('images').aggregate([
        { $match: { name: { $regex: name, $options: "i" } } },
        { $addFields: { selected: false } },
        { $setWindowFields: { output: { totalCount: { $count: {} } } } },
        { $skip: skipNumber },
        { $limit: this.rowInPages }]).toArray();
      return result;
    } catch (err: any) {
      this.logger.logError(err, "search");
    } finally {
      MongoDb.dbclose();
    }
  }
  async updateOne(id: string, entity: ImageEntity): Promise<any> {
    try {
      const db = await MongoDb.dbconnect();
      const objectId = parseToObjectId(id);
      const result = await db.collection('images').updateOne({
        _id: objectId,
      },
        {
          $set: {
            name: entity.name,
            alt: entity.alt,
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
      result = await db.collection('images').deleteOne({
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
      result = await db.collection('images').aggregate([
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
      result = await db.collection('images').find()
        .sort({ createdAt: -1 }).toArray();
      return result;
    } catch (err: any) {
      this.logger.logError(err, "findAll");
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
      result = await db.collection('images').aggregate([
        { $addFields: { selected: false } },
        { $setWindowFields: { output: { totalCount: { $count: {} } } } },
        { $skip: skipNumber },
        { $limit: this.rowInPages }
      ]).sort({ createdAt: -1 }).toArray()
      return result;
    } catch (err: any) {
      this.logger.logError(err, "findAllByPages");
    } finally {
      MongoDb.dbclose();
    }
    return result;
  }

  async createOne(entity: ImageEntity): Promise<any> {
    try {
      const db = await MongoDb.dbconnect();
      const result = await db.collection('images').insertOne({
        name: entity.name,
        image: entity.alt,
        createdAt: Date.now()
      });
      return result;
    } catch (err: any) {
      this.logger.logError(err, "createOne");
    } finally {
      MongoDb.dbclose();
    }
  }

  async findOne(id: string): Promise<ImageEntity> {
    let result;
    try {
      const objectId = parseToObjectId(id);
      const db = await MongoDb.dbconnect();
      result = await db.collection('images').find({ _id: objectId }).toArray();
    } catch (err: any) {
      this.logger.logError(err, "findOne");
    }
    return result;
  }

}

