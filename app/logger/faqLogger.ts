import { IBaseLogger } from "./iBaseLogger";
import { WinstonLogger } from "./winstonLogger";


export class FaqDalConcLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("FaqDal");
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


export class FaqRouterLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("FaqRouter");
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


export class FaqRouterClassLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("FaqRouterClass");
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



export class FaqWbDalLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("FaqWbDal");
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


export class FaqWbRouterLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("FaqWbRouter");
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


export class FaqWbRouterClassLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("FaqWbRouterClass");
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
     FaqRouterClassLogger,
     FaqRouterLogger,
     FaqDalConcLogger,
     FaqWbRouterLogger,
     FaqWbDalLogger,
     FaqWbRouterClassLogger,

}
