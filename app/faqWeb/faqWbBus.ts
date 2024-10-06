import { FaqEntity } from "../faq/faqEntity";
import { FaqWbDal } from "./faqWbDal";
import validator from "validator";
export interface FaqWbBus {
  findAll(): Promise<FaqEntity[]>;
}

export class FaqWbBusConc implements FaqWbBus {
  private db: FaqWbDal;
  constructor(db: FaqWbDal) {
    this.db = db;
  }
  async findAll(): Promise<FaqEntity[]> {

    const result = await this.db.findAll();
    return result;
  }
}

module.exports = {
  FaqWbBusConc,
};
