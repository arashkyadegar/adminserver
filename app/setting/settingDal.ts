import { MongoDb } from "../config/mongodb";
import { SettingDalConcLogger } from "../logger/settingLogger";
import { parseToObjectId } from "../utility/objectIdParser";
import { SettingEntity } from "./settingEntity";

export interface SettingDal {
  updateOne(id: string, entity: SettingEntity): Promise<boolean>;
  findOne(): Promise<SettingEntity>;
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
      result = await db.collection('settings').updateOne(
        { _id: "1" },

        {
          $set: {
            slideImages: entity.slideImages,
            updatedAt: Date.now()
          },
        },
        { upsert: true });
      return result;
    } catch (err: any) {
      this.logger.logError(err, "updateOne");
      return result;
    } finally {
      MongoDb.dbclose();
      return result;
    }
  }
  async findOne(): Promise<SettingEntity> {
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

