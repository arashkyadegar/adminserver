import { ProductWbEntity } from "../product/productEntity";
import { ProductDalConcLogger } from "../logger/productLogger";
import { MongoDb } from "../config/mongodb";
import { parseToObjectId } from "../utility/objectIdParser";
import { MysqlClient } from "../config/mysql";
var ObjectId = require("mongodb").ObjectId;
export interface ProductWbDal {
  // updateOne(id: string, entity: ProductEntity): Promise<boolean>;
  findOne(id: string,): Promise<ProductWbEntity>;
  findAll(): Promise<ProductWbEntity[]>;
  findByPage(page: number): Promise<ProductWbEntity[]>;
}
export class ProductWbDalConc implements ProductWbDal {
  logger: any;
  constructor() {
    this.logger = new ProductDalConcLogger();
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


export class ProductWbDalConcSQl implements ProductWbDal {
  findOne(id: string): Promise<ProductWbEntity> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<any> {
    let mysqlClient = new MysqlClient();
    let connection = await mysqlClient.dbconnect();
    connection.query('SELECT products.id as id,products.name as name,products.purchasePrice,products.category_id, products.weight,products.stock,products.colors,products.shortDesc,products.longDesc, products.brand_id,products.desc,products.keywords,products.status,products.tags,products.size,products.price , brands.id,brands.name,categories.id,categories.parent_id,categories.name,images.id,images.name,images.status FROM products INNER JOIN brands ON products.brand_id=brands.id INNER Join categories ON products.category_id=categories.id LEFT OUTER JOIN images ON products.id=images.product_id;',
      function (error, results, fields) {
        const x = JSON.parse(JSON.stringify(results))
        console.log(x)
        return results;
      });
  }

  findByPage(page: number): Promise<ProductWbEntity[]> {
    throw new Error("Method not implemented.");
  }

}