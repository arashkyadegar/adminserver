import express from "express";
import { FaqRouterLogger } from "../logger/faqLogger";
import { FaqWbBusConc } from "./faqWbBus";
import { FaqWbDalConc } from "./faqWbDal";
import { FaqWbRouterClass } from "./faqWbRouterClass";

export const FaqWbRouter = express.Router();

FaqWbRouter.get("/", async function (req, res, next) {
  try {
    const bus = new FaqWbBusConc(new FaqWbDalConc());
    const router = new FaqWbRouterClass(bus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FaqRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

module.exports = FaqWbRouter;
