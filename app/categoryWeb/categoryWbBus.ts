import { CategoryWbDal } from "./categoryWbDal";
import { CategoryEntity } from "../category/categoryEntity";

export interface CategoryWbBus {
  findAllGraph(): Promise<CategoryEntity[]>;
}

export class CategoryWbBusConc implements CategoryWbBus {
  private db: CategoryWbDal;
  constructor(db: CategoryWbDal) {
    this.db = db;
  }
  async findAllGraph(): Promise<any> {
    const results = await this.db.findAll();
    console.log(results)
    const nest = (results, id = 0, link = 'parent') =>
      results.filter((item: any) => item.parent === id)
        .map(item => ({ ...item, children: nest(results, item.id) }));
    const tree = nest(results)
    return tree;
  }
}
