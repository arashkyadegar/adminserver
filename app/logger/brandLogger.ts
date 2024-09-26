import { IBaseLogger } from "./iBaseLogger";
import { WinstonLogger } from "./winstonLogger";


export class BrandDalConcLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("BrandDal");
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


export class BrandRouterLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("BrandRouter");
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


export class BrandRouterClassLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("BrandRouterClass");
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



export class BrandWbDalLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("BrandWbDal");
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


export class BrandWbRouterLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("BrandWbRouter");
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


export class BrandWbRouterClassLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("BrandWbRouterClass");
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
     BrandRouterClassLogger,
     BrandRouterLogger,
     BrandDalConcLogger,
     BrandWbRouterLogger,
     BrandWbDalLogger,
     BrandWbRouterClassLogger,

}
