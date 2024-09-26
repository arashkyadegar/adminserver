import express from "express";
import { BrandWbRouterLogger } from "../logger/brandLogger";
import { BrandWbBusConc } from "./brandWbBus";
import { BrandWbDalConc } from "./brandWbDal";
import { BrandWbRouterClass } from "./brandWbRouterClass";
// import { checkAuthorize } from "../middleware/authorize";

export const BrandWbRouter = express.Router();
BrandWbRouter.get("/", async function (req, res, next) {
  try {
    const bus = new BrandWbBusConc(new BrandWbDalConc());
    const router = new BrandWbRouterClass(bus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new BrandWbRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

module.exports = BrandWbRouter;
