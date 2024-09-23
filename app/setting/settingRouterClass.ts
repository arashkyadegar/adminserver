import { ProductRouterClassLogger } from "../logger/productLogger";
import { ResponseStatus } from "../utility/errorStatus";
import { SettingEntity, SettingSchema } from "./settingEntity";
import validator from "validator";
import { SettingBus } from "./settingBus";
import { SettingRouterClassLogger } from "../logger/settingLogger";

export class SettingRouterClass {
  bus: SettingBus;
  logger: any;
  constructor(b: SettingBus) {
    this.bus = b;
    this.logger = new SettingRouterClassLogger();
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

    let id = req.params.id;
    result = await this.bus.findOne('1');

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


    let id = req.params.id;
    const SettingEntity = req.body as SettingEntity;
    const { error } = SettingSchema.validate(SettingEntity);
    if (error) {
      const errorResponse = `validation failed. errors: ${error} `;
      this.logger.logError(errorResponse, "updateOne");
      return {
        message: errorResponse,
        status: ResponseStatus.BAD_REQUEST,
      };
    }

    result = await this.bus.updateOne('1', SettingEntity);
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

module.exports = { SettingRouterClass };