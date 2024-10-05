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
    let r = Array<FaqEntity>();
    const result = await this.db.findAll();
    result.forEach((item: any) => {
      let x = new FaqEntity();
      x._id = item._id;
      x.question = validator.escape(item.question);
      x.answer = item.answer;
      x.createdAt = item.createdAt;
      x.priority = item.priority;
      x.groupId = item.groupId;
      r.push(x);
    });
    return r;
  }
}

module.exports = {
  FaqWbBusConc,
};
