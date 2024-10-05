import { FaqWbRouterClassLogger } from "../logger/faqLogger";
import { ResponseStatus } from "../utility/errorStatus";
import { FaqWbBus, FaqWbBusConc } from "./faqWbBus";
import validator from "validator";
import { FaqEntity, FaqSchema } from "../faq/faqEntity";
export class FaqWbRouterClass {
  bus: FaqWbBus;
  logger: any;
  constructor(b: FaqWbBus) {
    this.bus = b;
    this.logger = new FaqWbRouterClassLogger();
  }

  async findAll(req, res, next): Promise<any> {
    const result = await this.bus.findAll();

    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }
}
