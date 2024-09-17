import { IBaseLogger } from "./iBaseLogger";
import { WinstonLogger } from "./winstonLogger";

export class HomeRouterLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("HomeRouter");
     }

     logError(err: string, method: string): void {
          const instance = this.logger.getLogger(method);
          instance.error(err);
     }
     logInfo(err: string, method: string): void {
          const instance = this.logger.getLogger(method);
          instance.info(err);
     }
}


module.exports = {
     HomeRouterLogger
}
