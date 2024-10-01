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
    let priceMin = 0;
    let priceMax = 10000000;
    let brands = [];
    let options: any = [];



    if (req.query.name != undefined) {
      if (req.query.name.trim() !== "") {
        name = req.query.name;
        options.name = ({ $match: { name: { $regex: name, $options: "i" } } })
      } else {
        options.name = ({ $match: { name: { $exists: true } } })
      }
    } else {
      options.name = ({ $match: { name: { $exists: true } } })
    }

    if (req.query.priceMax != undefined) {
      priceMax = parseInt(req.query.priceMax);
    }

    options.priceMax = ({ $match: { price: { $lte: priceMax } } });


    if (req.query.priceMin != undefined) {
      priceMin = parseInt(req.query.priceMin);
    }

    options.priceMin = ({ $match: { price: { $gte: priceMin } } });


    if (req.query.brands != undefined) {
      if (req.query.brands.trim() != "") {
        brands = (req.query.brands).split(",");;
        options.brands = ({ $match: { brand: { $in: brands } } });
      } else {
        options.brands = ({ $match: { brand: { $exists: true } } });
      }
    } else {
      options.brands = ({ $match: { brand: { $exists: true } } });
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
