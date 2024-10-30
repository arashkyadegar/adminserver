import { FaqBusConc } from "../faq/faqBus";
import { FaqDalConc } from "../faq/faqDal";
import { FaqGroupDal } from "./faqGroupDal";
import { FaqGroupEntity } from "./faqGroupEntity";

export interface FaqGroupBus {
  updateOne(id: string, entity: FaqGroupEntity): Promise<FaqGroupEntity>;
  findOne(id: string): Promise<FaqGroupEntity>;
  createOne(entity: FaqGroupEntity): Promise<FaqGroupEntity>;
  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<FaqGroupEntity[]>;
}

export class FaqGroupBusConc implements FaqGroupBus {
  private db: FaqGroupDal;
  constructor(db: FaqGroupDal) {
    this.db = db;
  }
  async createOne(entity: FaqGroupEntity): Promise<FaqGroupEntity> {
    const result = await this.db.createOne(entity);
    return result;
  }
  async deleteOne(id: string): Promise<boolean> {
    const result = await this.db.deleteOne(id);
    return result;
  }
  async findAll(): Promise<FaqGroupEntity[]> {
    let result = await this.db.findAll();
    return result;
  }
  async findOne(id: string): Promise<FaqGroupEntity> {
    const result = await this.db.findOne(id);
    return result;
  }
  async updateOne(id: string, entity: FaqGroupEntity): Promise<FaqGroupEntity> {
    const result = await this.db.updateOne(id, entity);
    return result;
  }
}
