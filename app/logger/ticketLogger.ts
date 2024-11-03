import { IBaseLogger } from "./iBaseLogger";
import { WinstonLogger } from "./winstonLogger";


export class TicketDalConcLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("TicketDal");
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


export class TicketRouterLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("TicketRouter");
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


export class TicketRouterClassLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("TicketRouterClass");
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



export class TicketWbDalLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("TicketWbDal");
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


export class TicketWbRouterLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("TicketWbRouter");
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


export class TicketWbRouterClassLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("TicketWbRouterClass");
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


export class TicketGroupDalConcLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("TicketGroupDal");
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


export class TicketGroupRouterLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("TicketGroupRouter");
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


export class TicketGroupRouterClassLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("TicketGroupRouterClass");
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



export class TicketGroupWbDalLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("TicketGroupWbDal");
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


export class TicketGroupWbRouterLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("TicketGroupWbRouter");
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


export class TicketGroupWbRouterClassLogger implements IBaseLogger {
     logger: WinstonLogger;
     constructor() {
          this.logger = new WinstonLogger("TicketGroupWbRouterClass");
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
     TicketRouterClassLogger,
     TicketRouterLogger,
     TicketDalConcLogger,
     TicketWbRouterLogger,
     TicketWbDalLogger,
     TicketWbRouterClassLogger,
     TicketGroupDalConcLogger,
     TicketGroupRouterLogger,
     TicketGroupRouterClassLogger,
     TicketGroupWbDalLogger,
     TicketGroupWbRouterLogger,
     TicketGroupWbRouterClassLogger,

}
