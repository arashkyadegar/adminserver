import { MongoDb } from "../config/mongodb";
import { ProductEntity } from "./productEntity";
import { IBaseLogger } from "../logger/iBaseLogger";
import { ProductDalConcLogger } from "../logger/productLogger";
import { parseToObjectId } from "../utility/objectIdParser";

export interface ProductDal {
     findAll(): Promise<any>;
     findAllAbbrev(): Promise<any>;
     findOne(id: string): Promise<any>;
     search(name: string): Promise<any>;
     createOne(entity: ProductEntity): Promise<boolean>;
     updateOne(id: string, entity: ProductEntity): Promise<any>;
     deleteOne(id: string): Promise<boolean>;
}

export class ProductDalConc implements ProductDal {
     logger: IBaseLogger;
     constructor() {
          this.logger = new ProductDalConcLogger();
     }
     async search(name: string): Promise<any> {
          try {
               let result;

               const db = await MongoDb.dbconnect();
               result = await db.collection('products').aggregate([
                    { $match: { name: { $regex: name, $options: "i" } } },
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
                              "status": 1,
                              "createdAt": 1,
                         }
                    }, { $addFields: { category: { $first: "$category" } } }]).toArray();
               return result;
          } catch (err: any) {
               this.logger.logError(err, "search");
          } finally {
               MongoDb.dbclose();
          }
     }
     async updateOne(id: string, entity: ProductEntity): Promise<any> {
          try {
               const db = await MongoDb.dbconnect();
               const objectId = parseToObjectId(id);
               const categoryObjectId = parseToObjectId(entity.categoryId);
               const result = await db.collection('products').updateOne({
                    _id: objectId,
               },
                    {
                         $set: {
                              name: entity.name,
                              subCategories: entity.subCategories,
                              categoryId: categoryObjectId,
                              brand: entity.brand,
                              images: entity.images,
                              shortDesc: entity.shortDesc,
                              longdesc: entity.longdesc,
                              weakPoints: entity.weakPoints,
                              strongPoints: entity.strongPoints,

                              //seo
                              pageTitle: entity.pageTitle,
                              pageLink: entity.pageLink,
                              desc: entity.desc,
                              keywords: entity.keywords,
                              tags: entity.tags,

                              //sell
                              status: entity.status,
                              size: entity.size,
                              price: entity.price,
                              purchasePrice: entity.purchasePrice,
                              weight: entity.weight,
                              stock: entity.stock,
                              colors: entity.colors,
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
               result = await db.collection('products').deleteOne({
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
               result = await db.collection('products').aggregate([
                    {
                         $project: {
                              "_id": 1,
                              "name": 1
                         }
                    }
               ]).toArray();
               return result;
          } catch (err: any) {
               this.logger.logError(err, "getAll");
          } finally {
               MongoDb.dbclose();
          }
          return result;
     }

     async findAll(): Promise<any> {
          let result;
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
                              "stock": 1,
                              "price": 1,
                              "images": 1,
                              "status": 1,
                              "createdAt": 1,

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

     async createOne(entity: ProductEntity): Promise<any> {
          try {
               const db = await MongoDb.dbconnect();

               const categoryObjectId = parseToObjectId(entity.categoryId);
               const result = await db.collection('products').insertOne({
                    name: entity.name,
                    subCategories: entity.subCategories,
                    categoryId: categoryObjectId,
                    brand: entity.brand,
                    images: entity.images,
                    shortDesc: entity.shortDesc,
                    longdesc: entity.longdesc,
                    weakPoints: entity.weakPoints,
                    strongPoints: entity.strongPoints,

                    //seo
                    pageTitle: entity.pageTitle,
                    pageLink: entity.pageLink,
                    desc: entity.desc,
                    keywords: entity.keywords,
                    tags: entity.tags,

                    //sell
                    status: entity.status,
                    size: entity.size,
                    price: entity.price,
                    purchasePrice: entity.purchasePrice,
                    weight: entity.weight,
                    stock: entity.stock,
                    colors: entity.colors,
                    createdAt: Date.now()
               });
               return result;
          } catch (err: any) {
               this.logger.logError(err, "createOne");
          } finally {
               MongoDb.dbclose();
          }
     }

     async findOne(id: string): Promise<ProductEntity> {
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

}


