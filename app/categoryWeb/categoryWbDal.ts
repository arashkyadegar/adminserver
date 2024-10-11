import { MongoDb } from "../config/mongodb";
import { CategoryEntity } from "../category/categoryEntity";
import { IBaseLogger } from "../logger/iBaseLogger";
import { CategoryWbDalLogger } from "../logger/categoryLogger";
import { parseToObjectId } from "../utility/objectIdParser";


export interface CategoryWbDal {
     findAll(): Promise<any>;
     findOneByName(name: string): Promise<any>;
}

export class CategoryWbDalConc implements CategoryWbDal {
     logger: IBaseLogger;
     constructor() {
          this.logger = new CategoryWbDalLogger();
     }
     async findOneByName(name: string): Promise<CategoryEntity[]> {
          let result: CategoryEntity[] = [];
          try {
               const db = await MongoDb.dbconnect();
               result = await db.collection('categories').find({ name: name }).toArray();
          } catch (err: any) {
               this.logger.logError(err, "findOne");
          }
          return result;
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

}


