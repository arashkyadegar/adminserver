import { IBaseLogger } from "./iBaseLogger";
import { WinstonLogger } from "./winstonLogger";


export class ProductDalConcLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("ProductDal");
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


export class ProductRouterLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("ProductRouter");
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


export class ProductRouterClassLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("ProductRouterClass");
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



export class ProductWbDalLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("ProductWbDal");
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


export class ProductWbRouterLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("ProductWbRouter");
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


export class ProductWbRouterClassLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("ProductWbRouterClass");
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
     ProductWbRouterClassLogger,
     ProductRouterClassLogger,
     ProductRouterLogger,
     ProductDalConcLogger
}
