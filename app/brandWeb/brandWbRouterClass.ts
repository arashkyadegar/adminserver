import { BrandRouterClassLogger } from "../logger/brandLogger";
import { ResponseStatus } from "../utility/errorStatus";
import { BrandWbBus } from "./brandWbBus";

import validator from "validator";

export class BrandWbRouterClass {
  bus: BrandWbBus;
  logger: any;
  constructor(b: BrandWbBus) {
    this.bus = b;
    this.logger = new BrandRouterClassLogger();
  }

  async findAll(req, res, next): Promise<any> {
    const result = await this.bus.findAll();
    return {
      status: ResponseStatus.OK,
      message: result,
    };

  }

}

module.exports = { BrandWbRouterClass };