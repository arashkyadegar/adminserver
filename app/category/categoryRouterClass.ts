import { CategoryRouterClassLogger } from "../logger/categoryLogger";
import { ResponseStatus } from "../utility/errorStatus";
import { TreeView } from "../utility/tree-view";
import { CategoryBus } from "./categoryBus";
import { CategoryEntity, CategorySchema } from "./categoryEntity";
import validator from "validator";

export class CategoryRouterClass {
  bus: CategoryBus;
  logger: any;
  constructor(b: CategoryBus) {
    this.bus = b;
    this.logger = new CategoryRouterClassLogger();
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


  async findAllGraph(req, res, next): Promise<any> {
    const results = await this.bus.findAllGraph();

    return {
      status: ResponseStatus.OK,
      message: results,
    };

  }



  async search(req, res, next): Promise<any> {
    let page = 0;
    let result;
    if (req.query.page != undefined) {
      page = parseInt(req.query.page.toString());
    }

    if (req.query.name) {
      const name = req.query.name
      result = await this.bus.search(name, page);
      return {
        status: ResponseStatus.OK,
        message: result,
      };
    }
  }



  async deleteOne(req, res, next) {
    let result;
    if (req.params.id === undefined) {
      const errorResponse = `validation failed. id is not provided`;
      this.logger.logError(errorResponse, "deleteOne");
      return {
        status: ResponseStatus.BAD_REQUEST,
        message: errorResponse,
      };
    }

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

  async createOne(req, res, next): Promise<any> {
    let result;
    const categoryEntity = req.body as CategoryEntity;
    const { error } = CategorySchema.validate(categoryEntity);

    if (error) {
      const errorResponse = `validation failed. errors: ${error} `;
      this.logger.logError(errorResponse, "createOne");
      return {
        message: errorResponse,
        status: ResponseStatus.BAD_REQUEST,
      };
    }
    result = await this.bus.createOne(categoryEntity);
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
    const CategoryEntity = req.body as CategoryEntity;
    const { error } = CategorySchema.validate(CategoryEntity);
    if (error) {
      const errorResponse = `validation failed. errors: ${error} `;
      this.logger.logError(errorResponse, "updateOne");
      return {
        message: errorResponse,
        status: ResponseStatus.BAD_REQUEST,
      };
    }

    result = await this.bus.updateOne(id, CategoryEntity);

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
}

module.exports = { CategoryRouterClass };