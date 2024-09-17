import { ImageWbDal } from "./imageDal";
import { ImageWbEntity } from "./imageEntity";

export interface ImageBus {

  findOne(id: string): Promise<ImageWbEntity>;
  createOne(entity: ImageWbEntity): Promise<ImageWbEntity>;
  deleteOne(id: string): Promise<boolean>;
  findAll(product_id: number): Promise<ImageWbEntity[]>;
}

export class ImageBusConc implements ImageBus {
  private db: ImageWbDal;
  constructor(db: ImageWbDal) {
    this.db = db;
  }
  findOne(id: string): Promise<ImageWbEntity> {
    throw new Error("Method not implemented.");
  }
  createOne(entity: ImageWbEntity): Promise<ImageWbEntity> {
    throw new Error("Method not implemented.");
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async findAll(product_id: number): Promise<ImageWbEntity[]> {
    const result = await this.db.findAll(product_id);
    return result;
  }
}