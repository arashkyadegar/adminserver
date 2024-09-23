import express from "express";
import { ProductWbBusConc } from "./productWbBus";
import { ProductWbDalConc } from "./productWbDal";
import { ProductWbRouterClassLogger } from "../logger/productLogger";
import { ProductWbRouterClass } from "./productWbRouterClass";
export const ProductWbRouter = express.Router();

ProductWbRouter.get("/", async function (req, res, next) {
  try {
    const bus = new ProductWbBusConc(new ProductWbDalConc());
    const router = new ProductWbRouterClass(bus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new ProductWbRouterClassLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

ProductWbRouter.get("/:id", async function (req, res, next) {
  try {
    const bus = new ProductWbBusConc(new ProductWbDalConc());
    const router = new ProductWbRouterClass(bus);
    const result = await router.findOne(req, res, next);

    return res.status(200).send(result.message);
  } catch (err: any) {
    const logger = new ProductWbRouterClassLogger();
    logger.logError(err, "get /:id");
    next(err);
  }
});

ProductWbRouter.put("/:id", async function (req, res, next) {
  try {
    return res.status(200).send({ payload: "hi this is me" });
  } catch (err: any) {
    const logger = new ProductWbRouterClassLogger();
    logger.logError(err, "put /:id");
    next(err);
  }
});


ProductWbRouter.put("/findByPage/:id", async function (req, res, next) {
  try {
    const bus = new ProductWbBusConc(new ProductWbDalConc());
    const router = new ProductWbRouterClass(bus);
    const result = await router.findByPage(req, res, next);
    return res.status(200).send(result.message);
  } catch (err: any) {
    const logger = new ProductWbRouterClassLogger();
    logger.logError(err, "put /:id");
    next(err);
  }
});

module.exports = ProductWbRouter;
