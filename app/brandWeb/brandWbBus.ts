import { BrandWbDalConc ,BrandWbDal } from "./brandWbDal";
import { BrandEntity } from "../brand/brandEntity";

export interface BrandWbBus {
  findAll(): Promise<BrandEntity[]>;

}

export class BrandWbBusConc implements BrandWbBus {
  private db: BrandWbDal;
  constructor(db: BrandWbDal) {
    this.db = db;
  }

  async findAll(): Promise<BrandEntity[]> {
    const result = await this.db.findAll();
    return result;
  }
}
