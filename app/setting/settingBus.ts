import { SettingDal } from "./settingDal";
import { SettingEntity } from "./settingEntity";

export interface SettingBus {
  findOne(id: string): Promise<SettingEntity>; //returns found object.
  updateOne(id: string, entity: SettingEntity): Promise<boolean>; //returns true if update is succefull otherwise false.
}

export class SettingBusConc implements SettingBus {
  private db: SettingDal;
  constructor(db: SettingDal) {
    this.db = db;
  }
  async findOne(id: string): Promise<SettingEntity> {
    const result = await this.db.findOne();
    return result;
  }
  async updateOne(id: string, entity: SettingEntity): Promise<boolean> {
    const result = await this.db.updateOne(id, entity);
    return result;
  }
}