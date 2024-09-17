import { MongoDb } from "../config/mongodb";
import { SettingDalConcLogger } from "../logger/settingLogger";
import { parseToObjectId } from "../utility/objectIdParser";
import { SettingEntity } from "./settingEntity";

export interface SettingDal {
  updateOne(id: string, entity: SettingEntity): Promise<boolean>;
  findOne(id: string): Promise<SettingEntity>;
}
export class SettingDalConc implements SettingDal {
  logger: any;
  constructor() {
    this.logger = new SettingDalConcLogger();
  }
  async updateOne(id: string, entity: SettingEntity): Promise<boolean> {
    let result;
    try {
      const db = await MongoDb.dbconnect();
      result = await db.collection('products').updateOne(
        { _id: "1" },

        {
          $set: {
            slideImages: entity.slideImages,
            updatedAt: Date.now()
          },
        });
      return result;
    } catch (err: any) {
      this.logger.logError(err, "updateOne");
      return result;
    } finally {
      MongoDb.dbclose();
      return result;
    }
  }
  async findOne(id: string): Promise<SettingEntity> {
    let result;
    try {
      const db = await MongoDb.dbconnect();
      result = await db.collection('settings').find().toArray();
      return result
    } catch (err: any) {
      this.logger.logError(err, "updateOne");
      return result;
    } finally {
      MongoDb.dbclose();
      return result;
    }
  }
}
