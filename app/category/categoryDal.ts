import { MongoDb } from "../config/mongodb";
import { CategoryEntity } from "./categoryEntity";
import { IBaseLogger } from "../logger/iBaseLogger";
import { CategoryDalConcLogger } from "../logger/categoryLogger";
import { parseToObjectId } from "../utility/objectIdParser";


export interface CategoryDal {
     findAll(): Promise<CategoryEntity[]>;
     findAllByPages(page: number): Promise<any>;
     findOne(id: string): Promise<any>;
     search(name: string): Promise<any>;
     createOne(entity: CategoryEntity): Promise<boolean>;
     updateOne(id: string, entity: CategoryEntity): Promise<any>;
     deleteOne(id: string): Promise<boolean>;
     findAllGraph(): Promise<any>;
}

export class CategoryDalConc implements CategoryDal {
     logger: IBaseLogger;
     constructor() {
          this.logger = new CategoryDalConcLogger();
     }
     async findAllGraph(): Promise<any> {
          try {
               let result;
               const db = await MongoDb.dbconnect();
               result = await db.collection('categories').aggregate([
                    {
                         "$graphLookup": {
                              "from": "categories",
                              "startWith": "$id",
                              "connectFromField": "parent",
                              "connectToField": "parent",
                              "as": "children",
                              "depthField": "depth"
                         }
                    }
               ]);
               return result;
          } catch (err: any) {
               this.logger.logError(err, "search");
          } finally {
               MongoDb.dbclose();
          }
     }
     async search(name: string): Promise<any> {
          try {
               let result;
               const db = await MongoDb.dbconnect();
               result = await db.collection('categories').aggregate([
                    { $match: { name: { $regex: name, $options: "i" } } },
                    {
                         $lookup: {
                              from: "stores",
                              localField: "storeId",
                              foreignField: "_id",
                              as: "store",
                         },
                    }
               ])
                    .sort({ createdAt: -1 }).toArray();
               return result;
          } catch (err: any) {
               this.logger.logError(err, "search");
          } finally {
               MongoDb.dbclose();
          }
     }

     async updateOne(id: string, entity: CategoryEntity): Promise<any> {
          try {
               const db = await MongoDb.dbconnect();
               const objectId = parseToObjectId(id);
               const result = await db.collection('categories').updateOne({
                    _id: objectId,
               },
                    {
                         $set: {
                              name: entity.name,
                              pageTitle: entity.pageTitle,
                              menuTitle: entity.menuTitle,
                              parentCategoryId: entity.parent,
                              desc: entity.desc,
                              keywords: entity.keywords,
                              upDesc: entity.upDesc,
                              downDesc: entity.downDesc,
                              icon: entity.icon,
                              image: entity.image,
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

     async deleteOne(id: string): Promise<any> {
          let result;
          try {
               const objectId = parseToObjectId(id);
               const db = await MongoDb.dbconnect();
               result = await db.collection('categories').deleteOne({
                    _id: objectId,
               });

               return result;
          } catch (err: any) {
               this.logger.logError(err, "deleteOne");
          } finally {
               MongoDb.dbclose();
          }

     }

     async findAll(): Promise<CategoryEntity[]> {
          let result;
          try {

               const db = await MongoDb.dbconnect();
               result = await db.collection('categories').find()
                    .sort({ createdAt: -1 }).toArray();
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
               let skipNumber = (page - 1) * 10;
               const db = await MongoDb.dbconnect();
               result = await db.collection('categories').aggregate([
                    { $setWindowFields: { output: { totalCount: { $count: {} } } } },
                    { $skip: skipNumber },
                    { $limit: 10 }
               ]).sort({ createdAt: -1 }).toArray()
               return result;
          } catch (err: any) {
               this.logger.logError(err, "getAll");
          } finally {
               MongoDb.dbclose();
          }
          return result;
     }
     async createOne(entity: CategoryEntity): Promise<any> {
          try {
               const db = await MongoDb.dbconnect();
               const result = await db.collection('categories').insertOne({
                    name: entity.name,
                    id: entity.id,
                    pageTitle: entity.pageTitle,
                    menuTitle: entity.menuTitle,
                    parent: entity.parent,
                    desc: entity.desc,
                    keywords: entity.keywords,
                    upDesc: entity.upDesc,
                    downDesc: entity.downDesc,
                    icon: entity.icon,
                    image: entity.image,
                    children: entity.children,
                    active: false, //extra field for front-end redux use
                    createdAt: Date.now(),
               });
               return result;
          } catch (err: any) {
               this.logger.logError(err, "createOne");
          } finally {
               MongoDb.dbclose();
          }
     }

     async findOne(id: string): Promise<CategoryEntity> {
          let result;
          try {
               const objectId = parseToObjectId(id);
               const db = await MongoDb.dbconnect();
               result = await db.collection('categories').find({ _id: objectId }).toArray();
          } catch (err: any) {
               this.logger.logError(err, "findOne");
          }
          return result;
     }
}


