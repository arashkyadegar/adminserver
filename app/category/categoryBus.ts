import { CategoryDal } from "./categoryDal";
import { CategoryEntity } from "./categoryEntity";

export interface CategoryBus {
  search(name: string): Promise<CategoryEntity[]>;
  updateOne(id: string, entity: CategoryEntity): Promise<boolean>;
  findOne(id: string): Promise<CategoryEntity>;
  createOne(entity: CategoryEntity): Promise<CategoryEntity>;
  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<CategoryEntity[]>;
}

export class CategoryBusConc implements CategoryBus {
  private db: CategoryDal;
  constructor(db: CategoryDal) {
    this.db = db;
  }
  async search(name: string): Promise<CategoryEntity[]> {
    const result = await this.db.search(name);
    return result;
  }
  async updateOne(id: string, entity: CategoryEntity): Promise<boolean> {
    const result = await this.db.updateOne(id, entity);
    return result;
  }

  async createOne(entity: CategoryEntity): Promise<any> {
    const result = await this.db.createOne(entity);
    return result;
  }


  async findOne(id: string): Promise<CategoryEntity> {
    const result = await this.db.findOne(id);
    return result;
  }

  async deleteOne(id: string): Promise<boolean> {
    const result = await this.db.deleteOne(id);
    return result;
  }
  async findAll(): Promise<CategoryEntity[]> {
    const result = await this.db.findAll();
    return result;
  }
}
