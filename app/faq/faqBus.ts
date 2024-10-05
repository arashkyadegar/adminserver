import { FaqDal } from "./faqDal";
import { FaqEntity } from "./faqEntity";

export interface FaqBus {
  updateOne(id: string, entity: FaqEntity): Promise<boolean>;
  findOne(id: string): Promise<FaqEntity>;
  createOne(entity: FaqEntity): Promise<boolean>;
  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<FaqEntity[]>;
}

export class FaqBusConc implements FaqBus {
  private db: FaqDal;
  constructor(db: FaqDal) {
    this.db = db;
  }
  async createOne(entity: FaqEntity): Promise<boolean> {
    const result = await this.db.createOne(entity);
    return result;
  }
  async deleteOne(id: string): Promise<boolean> {
    const result = await this.db.deleteOne(id);
    return result;
  }
  async findAll(): Promise<FaqEntity[]> {
    const result = await this.db.findAll();
    return result;
  }
  async findOne(id: string): Promise<FaqEntity> {
    const result = await this.db.findOne(id);
    return result;
  }
  async updateOne(id: string, entity: FaqEntity): Promise<boolean> {
    const result = await this.db.updateOne(id, entity);
    return result;
  }
}
