import { ImageDal } from "./imageDal";
import { ImageEntity, ImageListEntity } from "./imageEntity";

export interface ImageBus {
  findOne(id: string): Promise<ImageEntity>;
  createOne(entity: ImageEntity): Promise<ImageEntity>;
  createMany(entities: ImageListEntity): Promise<ImageListEntity>;
  updateOne(id: string, entity: ImageEntity): Promise<ImageEntity>;
  deleteOne(id: string): Promise<boolean>;
  findAll(): Promise<ImageEntity[]>;
  findAllByPages(page: number): Promise<any>;
}

export class ImageBusConc implements ImageBus {
  private db: ImageDal;
  constructor(db: ImageDal) {
    this.db = db;
  }

  async createOne(entity: ImageEntity): Promise<ImageEntity> {
    const result = await this.db.createOne(entity);
    return result;
  }

  async updateOne(id: string, entity: ImageEntity): Promise<ImageEntity> {
    const result = await this.db.updateOne(id, entity);
    return result;
  }

  async findOne(id: string): Promise<ImageEntity> {
    const result = await this.db.findOne(id);
    return result;
  }

  async createMany(entites: ImageListEntity): Promise<ImageListEntity> {
    const result = await this.db.createMany(entites);
    return result;
  }

  deleteOne(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async findAll(): Promise<ImageEntity[]> {
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