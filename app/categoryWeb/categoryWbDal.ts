import { MongoDb } from "../config/mongodb";
import { CategoryEntity } from "../category/categoryEntity";
import { IBaseLogger } from "../logger/iBaseLogger";
import { CategoryWbDalLogger } from "../logger/categoryLogger";
import { parseToObjectId } from "../utility/objectIdParser";


export interface CategoryWbDal {
     findAll(): Promise<any>;
}

export class CategoryWbDalConc implements CategoryWbDal {
     logger: IBaseLogger;
     constructor() {
          this.logger = new CategoryWbDalLogger();
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


