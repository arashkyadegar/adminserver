import validator from "validator";
import { ProductWbBus } from "./productWbBus";
import { ResponseStatus } from "../utility/errorStatus";
import { ProductWbRouterClassLogger } from "../logger/productLogger";

export class ProductWbRouterClass {
  bus: ProductWbBus;
  logger: any;
  constructor(b: ProductWbBus) {
    this.bus = b;
    this.logger = new ProductWbRouterClassLogger();
  }

  async search(req, res, next): Promise<any> {
    
    let name = "";
    let pricemin = 0;
    let pricemax = 10000000;
    let brandItems = [];
    let options: any = [];


    if (req.query.name != undefined) {
      name = req.query.name;
      options.name = ({ $match: { name: { $regex: name, $options: "i" } } })
    } else {
      options.name = ({ $match: { name: { $exists: true } } })
    }



    if (req.query.pricemax != undefined) {
      pricemax = parseInt(req.query.pricemax);
    }

    options.pricemax = ({ $match: { price: { $lte: pricemax } } });


    if (req.query.pricemin != undefined) {
      pricemin = parseInt(req.query.pricemin);
    }

    options.pricemin = ({ $match: { price: { $gte: pricemin } } });


    if (req.query.brand != undefined) {

      brandItems = (req.query.brand).split("_");;
      options.brand = ({ $match: { brand: { $in: brandItems } } });
    } else {
      options.brand = ({ $match: { brand: { $exists: true } } });
    }


    const result = await this.bus.search(options);
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }

  async findAll(req, res, next): Promise<any> {
    const result = await this.bus.findAll();
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }

  async findOne(req, res, next): Promise<any> {
    let result;
    let wbuserId: string = "";
    // if (req.query.wbuserId != undefined) {
    //   if (
    //     validator.isMongoId(validator.escape(req.query.wbuserId.toString()))
    //   ) {
    //     wbuserId = req.query.wbuserId;
    //     // const errorResponse = `validation failed. wbuserId is not valid`;
    //     // this.logger.logError(errorResponse, "findOneProduct");
    //     // return {
    //     //   status: ResponseStatus.BAD_REQUEST,
    //     //   message: errorResponse,
    //     // };
    //   }
    // }
    //  else {
    //   const errorResponse = `validation failed. wbuserId is not provided`;
    //   this.logger.logError(errorResponse, "findOneProduct");
    //   return {
    //     status: ResponseStatus.BAD_REQUEST,
    //     message: errorResponse,
    //   };
    // }

    if (req.params.id === undefined) {
      const errorResponse = `validation failed. id is not provided`;
      this.logger.logError(errorResponse, "findOneProduct");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    if (!validator.isMongoId(req.params.id.toString())) {
      const errorResponse = `validation failed. id is not valid`;
      this.logger.logError(errorResponse, "findOneProduct");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    let id = req.params.id;

    result = await this.bus.findOne(id);

    if (result === undefined) {
      const errorResponse = `item not found.`;
      this.logger.logError(errorResponse, "findOneProduct");
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
  async findByPage(req, res, next): Promise<any> {
    let result;
    if (req.params.page != undefined) {
      let page = req.params.page;
      result = await this.bus.findByPage(page);
    }
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }
}
module.exports = { ProductWbRouterClass };
