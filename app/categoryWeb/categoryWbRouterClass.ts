import { CategoryWbRouterClassLogger } from "../logger/categoryLogger";
import { ResponseStatus } from "../utility/errorStatus";
import { CategoryWbBus } from "./categoryWbBus";


export class CategoryWbRouterClass {
  bus: CategoryWbBus;
  logger: any;
  constructor(b: CategoryWbBus) {
    this.bus = b;
    this.logger = new CategoryWbRouterClassLogger();
  }

  async findAll(req, res, next): Promise<any> {
    const result = await this.bus.findAllGraph();
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }

}

module.exports = { CategoryWbRouterClass };