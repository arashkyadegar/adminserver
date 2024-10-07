import { ProductDal } from "./productDal";
import { ProductEntity } from "./productEntity";

export interface ProductBus {
  search(name: string): Promise<ProductEntity[]>;
  updateOne(id: string, entity: ProductEntity): Promise<boolean>;
  findOne(id: string): Promise<ProductEntity>;
  createOne(entity: ProductEntity): Promise<ProductEntity>;
  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<ProductEntity[]>;
  findAllAbbrev(): Promise<ProductEntity[]>;
  findAllByPages(page: number): Promise<any>;
}

export class ProductBusConc implements ProductBus {
  private db: ProductDal;
  constructor(db: ProductDal) {
    this.db = db;
  }

  async findAllAbbrev(): Promise<ProductEntity[]> {
    const result = await this.db.findAllAbbrev();
    return result;
  }

  async search(name: string): Promise<ProductEntity[]> {
    const result = await this.db.search(name);
    return result;
  }

  async updateOne(id: string, entity: ProductEntity): Promise<boolean> {
    const result = await this.db.updateOne(id, entity);
    return result;
  }

  async createOne(entity: ProductEntity): Promise<any> {
    const result = await this.db.createOne(entity);
    return result;
  }

  async findOne(id: string): Promise<ProductEntity> {
    const result = await this.db.findOne(id);
    return result;
  }

  async deleteOne(id: string): Promise<boolean> {
    const result = await this.db.deleteOne(id);
    return result;
  }

  async findAll(): Promise<ProductEntity[]> {
    const result = await this.db.findAll();
    return result;
  }

  async findAllByPages(page: number): Promise<any> {
    let totalCount = 0;
    const rows = await this.db.findAllByPages(page);
    if (rows[0].totalCount) {
      totalCount = rows[0].totalCount;
    }
    return { rows, totalCount, page: page };
  }
}
