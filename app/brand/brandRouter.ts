import express from "express";
import { BrandRouterLogger } from "../logger/brandLogger";
import { BrandBusConc } from "./brandBus";
import { BrandDalConc } from "./brandDal";
import { BrandRouterClass } from "./brandRouterClass";
// import { checkAuthorize } from "../middleware/authorize";

export const BrandRouter = express.Router();

BrandRouter.get("/search", async function (req, res, next) {
  try {
    const bus = new BrandBusConc(new BrandDalConc());
    const router = new BrandRouterClass(bus);
    const result = await router.search(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new BrandRouterLogger();
    logger.logError(err, "get /search");
    next(err);
  }
});


BrandRouter.get("/", async function (req, res, next) {
  try {
    const bus = new BrandBusConc(new BrandDalConc());
    const router = new BrandRouterClass(bus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new BrandRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});


BrandRouter.get("/:id", async function (req, res, next) {
  try {
    const bus = new BrandBusConc(new BrandDalConc());
    const router = new BrandRouterClass(bus);
    const result = await router.findOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new BrandRouterLogger();
    logger.logError(err, "get /:id");
    next(err);
  }
});


BrandRouter.delete("/:id", async function (req, res, next) {
  try {
    const bus = new BrandBusConc(new BrandDalConc());
    const router = new BrandRouterClass(bus);
    const result = await router.deleteOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new BrandRouterLogger();
    logger.logError(err, "delete /:id");
    next(err);
  }
});


BrandRouter.put("/:id", async function (req, res, next) {
  try {
    const bus = new BrandBusConc(new BrandDalConc());
    const router = new BrandRouterClass(bus);
    const result = await router.updateOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new BrandRouterLogger();
    logger.logError(err, "put /:id");
    next(err);
  }
});


BrandRouter.post("/", async function (req, res, next) {
  try {
    const bus = new BrandBusConc(new BrandDalConc());
    const router = new BrandRouterClass(bus);
    const result = await router.createOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new BrandRouterLogger();
    logger.logError(err, "post /:id");
    next(err);
  }
});

module.exports = BrandRouter;
