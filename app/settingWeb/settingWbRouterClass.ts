import { ResponseStatus } from "../utility/errorStatus";
import { SettingWbBus} from "./settingWbBus";
import { SettingRouterClassLogger } from "../logger/settingLogger";

export class SettingRouterClass {
  bus: SettingWbBus;
  logger: any;
  constructor(b: SettingWbBus) {
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


}

module.exports = { SettingRouterClass };