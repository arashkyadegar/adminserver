import { CategoryDal } from "./categoryDal";
import { CategoryEntity } from "./categoryEntity";

export interface CategoryBus {
  search(name: string): Promise<CategoryEntity[]>;
  updateOne(id: string, entity: CategoryEntity): Promise<boolean>;
  findOne(id: string): Promise<CategoryEntity>;
  createOne(entity: CategoryEntity): Promise<CategoryEntity>;
  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<CategoryEntity[]>;
  findAllGraph(): Promise<any>;
  findAllByPages(page: number): Promise<any>;

}

export class CategoryBusConc implements CategoryBus {
  private db: CategoryDal;
  constructor(db: CategoryDal) {
    this.db = db;
  }



  async findAllGraph(): Promise<any> {
    const results = await this.db.findAll();
    const nest = (results, id = 0, link = 'parent') =>
      results.filter((item: any) => item.parent === id)
        .map(item => ({ ...item, children: nest(results, item.id) }));
    const tree = nest(results)
    return tree;
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
    const list = await this.db.findAll();
    entity.id = list.length + 1;
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

  async findAllByPages(page: number): Promise<any> {
    let totalCount = 0;
    const rows = await this.db.findAllByPages(page);
    if (rows[0].totalCount) {
      totalCount = rows[0].totalCount;
    }
    return { rows, totalCount, page: page };
  }
}
