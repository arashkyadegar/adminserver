import { ProductEntity, ProductWbEntity } from "../product/productEntity";
import { ProductDalConcLogger } from "../logger/productLogger";
import { MongoDb } from "../config/mongodb";
import { parseToObjectId } from "../utility/objectIdParser";
import { array } from "joi";
var ObjectId = require("mongodb").ObjectId;
export interface ProductWbDal {
  // updateOne(id: string, entity: ProductEntity): Promise<boolean>;
  findOne(id: string,): Promise<ProductWbEntity>;
  findAll(): Promise<ProductWbEntity[]>;
  findByPage(page: number): Promise<ProductWbEntity[]>;
  search(options: any): Promise<ProductWbEntity[]>;
}
export class ProductWbDalConc implements ProductWbDal {
  logger: any;
  constructor() {
    this.logger = new ProductDalConcLogger();
  }
  async search(options: any): Promise<ProductWbEntity[]> {
    let result;
    try {

      const db = await MongoDb.dbconnect();
      result = await db.collection('products').aggregate([
        options.name,
        options.priceMax,
        options.priceMin,
        options.brands,
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          }
        }, {
          $project: {
            "_id": 1,
            "name": 1,
            "stock": 1,
            "price": 1,
            "images": 1,
            "discount": 1,
            "status": 1,
            "createdAt": 1,
            "brand": 1
          }
        }, { $addFields: { category: { $first: "$category" } } }]).toArray();
    } catch (err: any) {
      this.logger.logError(err, "findOne");
    }
    return result;
  }

  async findOne(id: string,): Promise<ProductWbEntity> {
    let result;
    try {
      const objectId = parseToObjectId(id);
      const db = await MongoDb.dbconnect();
      result = await db.collection('products').find({ _id: objectId }).toArray();
    } catch (err: any) {
      this.logger.logError(err, "findOne");
    }
    return result;
  }

  async findAll(): Promise<ProductWbEntity[]> {
    let result = new Array<ProductWbEntity>();

    try {
      const db = await MongoDb.dbconnect();
      result = await db.collection('products').aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          }
        }, {
          $project: {
            "_id": 1,
            "name": 1,
            "discount": 1,
            "stock": 1,
            "price": 1,
            "images": 1,
            "status": 1,
            "createdAt": 1,
            "category.name": 1,

          }
        }, { $addFields: { category: { $first: "$category" } } }]).sort({ createdAt: -1 }).toArray();
      return result;
    } catch (err: any) {
      this.logger.logError(err, "getAll");
    } finally {
      MongoDb.dbclose();
    }
    return result;
  }

  async findByPage(page: number): Promise<ProductWbEntity[]> {
    let result;
    try {
      const db = await MongoDb.dbconnect();
      let skipNumber = page * 5;
      await db.collection('products').then((products) => {
        result = products
          .find({})
          .skip(skipNumber)
          .limit(5)
          .sort({ date: -1 })
          .toArray();
      });
    } catch (err: any) {
      this.logger.logError(err, "find");
    }

    return result;
  }
}
