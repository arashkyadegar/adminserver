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
  async findOneByName(req,res,next):Promise<any> {
    {
      let result;
      if (req.params.name === undefined) {
        const errorResponse = `validation failed. id is not provided`;
        this.logger.logError(errorResponse, "findOne");
        return {
          status: ResponseStatus.BAD_REQUEST,
          message: errorResponse,
        };
      }

      let name = req.params.name;
      result = await this.bus.findOneByName(name);
  
      if (result === undefined) {
        const errorResponse = `item not found.`;
        this.logger.logError(errorResponse, "findOne");
        return {
          status: ResponseStatus.NOT_FOUND,
          message: errorResponse,
        };
      }
      return {
        status: ResponseStatus.OK,
        message: result,
      };
    }

  }
}

module.exports = { CategoryWbRouterClass };