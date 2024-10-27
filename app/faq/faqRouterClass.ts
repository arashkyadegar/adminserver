import { FaqRouterClassLogger } from "../logger/faqLogger";
import { ResponseStatus } from "../utility/errorStatus";
import { FaqBus } from "./faqBus";
import validator from "validator";
import { FaqEntity, FaqSchema } from "./faqEntity";
export class FaqRouterClass {
  bus: FaqBus;
  logger: any;
  constructor(b: FaqBus) {
    this.bus = b;
    this.logger = new FaqRouterClassLogger();
  }

  async findAll(req, res, next): Promise<any> {
    let page = 0;
    let result;
    if (req.query.page != undefined) {
      page = parseInt(req.query.page.toString());
      result = await this.bus.findAllByPages(page);
    } else {
      result = await this.bus.findAll();
    }
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }

  async deleteOne(req, res, next) {
    let result;

    //if id is undefined
    if (req.params.id === undefined) {
      const errorResponse = `validation failed. id is not provided`;
      this.logger.logError(errorResponse, "deleteOne");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    //if id is not valid
    if (!validator.isMongoId(req.params.id.toString())) {
      const errorResponse = `validation failed. id is not valid`;
      this.logger.logError(errorResponse, "deleteOne");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    let id = req.params.id;
    result = await this.bus.deleteOne(id);

    //if item is not found
    if (!result) {
      return {
        status: ResponseStatus.NOT_FOUND,
        message: result,
      };
    }

    //if operation succeed
    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }

  async findOne(req, res, next) {

    let result;
    if (req.params.id === undefined) {
      const errorResponse = `validation failed. id is not provided`;
      this.logger.logError(errorResponse, "findOne");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    if (!validator.isMongoId(req.params.id.toString())) {
      const errorResponse = `validation failed. id is not valid`;
      this.logger.logError(errorResponse, "findOne");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    let id = req.params.id;
    result = await this.bus.findOne(id);

    //if item is not found
    if (result.length == 0) {
      return {
        status: ResponseStatus.NOT_FOUND,
        message: result,
      };
    }

    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }



  async updateOne(req, res, next): Promise<any> {
    let result;
    let userId: string = "";

    if (req.params.id === undefined) {
      const errorResponse = `validation failed. id is not provided`;
      this.logger.logError(errorResponse, "updateOne");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    if (!validator.isMongoId(req.params.id.toString())) {
      const errorResponse = `validation failed. id is not valid`;
      this.logger.logError(errorResponse, "updateOne");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

    let id = req.params.id;
    const faqEntity = req.body as FaqEntity;
    const { error } = FaqSchema.validate(faqEntity);
    if (error) {
      const errorResponse = `validation failed. errors: ${error} `;
      this.logger.logError(errorResponse, "updateOne");
      return {
        message: errorResponse,
        status: ResponseStatus.BAD_REQUEST,
      };
    }

    result = await this.bus.updateOne(id, faqEntity);

    if (result === undefined) {
      const errorResponse = `item not found.`;
      this.logger.logError(errorResponse, "updateOne");
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



  async createOne(req, res, next): Promise<any> {
    let result;
    const faqEntity = req.body as FaqEntity;

    const { error } = FaqSchema.validate(faqEntity);

    if (error) {
      const errorResponse = `validation failed. errors: ${error} `;
      this.logger.logError(errorResponse, "createOne");
      return {
        message: errorResponse,
        status: ResponseStatus.BAD_REQUEST,
      };
    }


    result = await this.bus.createOne(faqEntity);

    if (!result) {
      return {
        message: 'operation failed',
        status: ResponseStatus.BAD_REQUEST,
      };
    }

    return {
      status: ResponseStatus.OK,
      message: result,
    };
  }
}

module.exports = { FaqRouterClass };
