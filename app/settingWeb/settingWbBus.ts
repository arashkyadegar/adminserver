import { SettingWbDal } from "./settingWbDal";
import { SettingEntity } from "./settingWbEntity";

export interface SettingWbBus {
  findOne(id: string): Promise<SettingEntity>; //returns found object.
}

export class SettingWbBusConc implements SettingWbBus {
  private db: SettingWbDal;
  constructor(db: SettingWbDal) {
    this.db = db;
  }
  async findOne(id: string): Promise<SettingEntity> {
    const result = await this.db.findOne();

    return result;
  }

}