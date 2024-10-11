import { BrandDal } from "./brandDal";
import { BrandEntity } from "./brandEntity";

export interface BrandBus {
  search(name: string, page: number): Promise<BrandEntity[]>;
  updateOne(id: string, entity: BrandEntity): Promise<boolean>;
  findOne(id: string): Promise<BrandEntity>;
  createOne(entity: BrandEntity): Promise<BrandEntity>;
  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<BrandEntity[]>;
  findAllByPages(page: number): Promise<any>;
}

export class BrandBusConc implements BrandBus {
  private db: BrandDal;
  constructor(db: BrandDal) {
    this.db = db;
  }


  async search(name: string, page: number): Promise<any> {
    let totalCount = 0;
    const rows = await this.db.search(name, page);
    try {
      if (rows[0].totalCount) {
        totalCount = rows[0].totalCount;
      }
    } catch (ex: any) { }
    return { rows, totalCount, page: page };
  }
  async updateOne(id: string, entity: BrandEntity): Promise<boolean> {
    const result = await this.db.updateOne(id, entity);
    return result;
  }

  async createOne(entity: BrandEntity): Promise<any> {
    const result = await this.db.createOne(entity);
    return result;
  }


  async findOne(id: string): Promise<BrandEntity> {
    const result = await this.db.findOne(id);
    return result;
  }

  async deleteOne(id: string): Promise<boolean> {
    const result = await this.db.deleteOne(id);
    return result;
  }
  async findAll(): Promise<BrandEntity[]> {
    const result = await this.db.findAll();
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
