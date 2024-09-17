
import { IBaseLogger } from "../logger/iBaseLogger";
import { ImageDalConcLogger } from "../logger/imageLogger";
import { ProductWbEntity } from "../product/productEntity";
import { ImageWbEntity } from "./imageEntity";

export interface ImageWbDal {
  creatOne(entity: ImageWbEntity);
  findOne(id: string,): Promise<ImageWbEntity>;
  findAll(product_id: number): Promise<ImageWbEntity[]>;
  findByPage(page: number): Promise<ImageWbEntity[]>;
}

export class ImageWbDalConc implements ImageWbDal {
  logger: IBaseLogger;
  constructor() {
    this.logger = new ImageDalConcLogger();
  }
  creatOne(entity: ImageWbEntity) {
    throw new Error("Method not implemented.");
  }
  findOne(id: string): Promise<ImageWbEntity> {
    throw new Error("Method not implemented.");
  }
  async findAll(product_id: number): Promise<ImageWbEntity[]> {
    let result;
      return result;

  }
  findByPage(page: number): Promise<ImageWbEntity[]> {
    throw new Error("Method not implemented.");
  }
}