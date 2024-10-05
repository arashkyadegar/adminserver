import { MongoDb } from "../config/mongodb";
import { SettingDalConcLogger } from "../logger/settingLogger";
import { parseToObjectId } from "../utility/objectIdParser";
import { SettingEntity } from "./settingWbEntity";

export interface SettingWbDal {
  findOne(): Promise<SettingEntity>;
}
export class SettingWbDalConc implements SettingWbDal {
  logger: any;
  constructor() {
    this.logger = new SettingDalConcLogger();
  }

  async findOne(): Promise<SettingEntity> {
    let result;
    try {
      const db = await MongoDb.dbconnect();
      result = await db.collection('settings').find().toArray();
      return result
    } catch (err: any) {
      this.logger.logError(err, "findOne");
      return result;
    } finally {
      MongoDb.dbclose();
      return result;
    }
  }
}

