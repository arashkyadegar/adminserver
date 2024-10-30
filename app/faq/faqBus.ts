import { FaqDal } from "./faqDal";
import { FaqEntity } from "./faqEntity";

export interface FaqBus {
  updateOne(id: string, entity: FaqEntity): Promise<FaqEntity>;
  findOne(id: string): Promise<FaqEntity[]>;
  createOne(entity: FaqEntity): Promise<FaqEntity>;
  deleteOne(id: string): Promise<FaqEntity>;
  findAll(): Promise<FaqEntity[]>;
  findAllByPages(page: number): Promise<any>;
  findAllByGroup(groupId: string): Promise<FaqEntity[]>;
}

export class FaqBusConc implements FaqBus {
  private db: FaqDal;
  constructor(db: FaqDal) {
    this.db = db;
  }

  async findAllByGroup(groupId: string): Promise<FaqEntity[]> {
    const result = await this.db.findAllByGroup(groupId);
    return result;
  }
  async createOne(entity: FaqEntity): Promise<FaqEntity> {
    const result = await this.db.createOne(entity);
    return result;
  }
  async deleteOne(id: string): Promise<FaqEntity> {
    const result = await this.db.deleteOne(id);
    return result;
  }
  async findAll(): Promise<FaqEntity[]> {
    const result = await this.db.findAll();
    return result;
  }
  async findOne(id: string): Promise<FaqEntity[]> {
    const result = await this.db.findOne(id);
    return result;
  }
  async updateOne(id: string, entity: FaqEntity): Promise<FaqEntity> {
    const result = await this.db.updateOne(id, entity);
    return result;
  }
  async findAllByPages(page: number): Promise<any> {
    let totalCount = 0;
    const rows = await this.db.findAllByPages(page);
    try {
      if (rows[0].totalCount) {
        totalCount = rows[0].totalCount;
      }
    } catch (ex: any) { }
    return { rows, totalCount, page: page };
  }
}
