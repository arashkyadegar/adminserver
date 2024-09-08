import { IBaseLogger } from "./iBaseLogger";
import { WinstonLogger } from "./winstonLogger";


export class CategoryDalConcLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("CategoryDal");
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


export class CategoryRouterLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("CategoryRouter");
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


export class CategoryRouterClassLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("CategoryRouterClass");
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



export class CategoryWbDalLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("CategoryWbDal");
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


export class CategoryWbRouterLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("CategoryWbRouter");
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


export class CategoryWbRouterClassLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("CategoryWbRouterClass");
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
     CategoryRouterClassLogger,
     CategoryRouterLogger,
     CategoryDalConcLogger
}
