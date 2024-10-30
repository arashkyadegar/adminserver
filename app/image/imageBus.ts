import { ImageDal } from "./imageDal";
import { ImageEntity } from "./imageEntity";

export interface ImageBus {

  findOne(id: string): Promise<ImageEntity>;
  createOne(entity: ImageEntity): Promise<ImageEntity>;
  deleteOne(id: string): Promise<boolean>;
  findAll(product_id: number): Promise<ImageEntity[]>;
}

export class ImageBusConc implements ImageBus {
  private db: ImageDal;
  constructor(db: ImageDal) {
    this.db = db;
  }
  async findOne(id: string): Promise<ImageEntity> {
    const result = await this.db.findOne(id);
    return result;
  }
  async createOne(entity: ImageEntity): Promise<ImageEntity> {
    const result = await this.db.createOne(entity);
    return result;
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async findAll(): Promise<ImageEntity[]> {
    const result = await this.db.findAll();
    return result;
  }
}