import { CategoryWbDal } from "./categoryWbDal";
import { CategoryEntity } from "../category/categoryEntity";

export interface CategoryWbBus {
  findAllGraph(): Promise<CategoryEntity[]>;
  findOneByName(name: string): Promise<any>;
}

export class CategoryWbBusConc implements CategoryWbBus {
  private db: CategoryWbDal;
  constructor(db: CategoryWbDal) {
    this.db = db;
  }
  async findOneByName(name: string): Promise<CategoryEntity[]> {
    const results = await this.db.findOneByName(name);
    return results;
  }
  async findAllGraph(): Promise<any> {
    const results = await this.db.findAll();
    const nest = (results, id = 0, link = 'parent') =>
      results.filter((item: any) => item.parent === id)
        .map(item => ({ ...item, children: nest(results, item.id) }));
    const tree = nest(results)
    return tree;
  }
}
