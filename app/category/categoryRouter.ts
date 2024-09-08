import express from "express";
import { CategoryRouterLogger } from "../logger/categoryLogger";
import { CategoryBusConc } from "./categoryBus";
import { CategoryDalConc } from "./categoryDal";
import { CategoryRouterClass } from "./categoryRouterClass";
// import { checkAuthorize } from "../middleware/authorize";

export const CategoryRouter = express.Router();

CategoryRouter.get("/search", async function (req, res, next) {
  try {
    const bus = new CategoryBusConc(new CategoryDalConc());
    const router = new CategoryRouterClass(bus);
    const result = await router.search(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new CategoryRouterLogger();
    logger.logError(err, "get /search");
    next(err);
  }
});

CategoryRouter.get("/",  async function (req, res, next) {
  try {
    const bus = new CategoryBusConc(new CategoryDalConc());
    const router = new CategoryRouterClass(bus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new CategoryRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

CategoryRouter.get("/:id", async function (req, res, next) {
  try {
    const bus = new CategoryBusConc(new CategoryDalConc());
    const router = new CategoryRouterClass(bus);
    const result = await router.findOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new CategoryRouterLogger();
    logger.logError(err, "get /:id");
    next(err);
  }
});

CategoryRouter.delete("/:id",  async function (req, res, next) {
  try {
    const bus = new CategoryBusConc(new CategoryDalConc());
    const router = new CategoryRouterClass(bus);
    const result = await router.deleteOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new CategoryRouterLogger();
    logger.logError(err, "delete /:id");
    next(err);
  }
});

CategoryRouter.put("/:id",  async function (req, res, next) {
  try {
    const bus = new CategoryBusConc(new CategoryDalConc());
    const router = new CategoryRouterClass(bus);
    const result = await router.updateOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new CategoryRouterLogger();
    logger.logError(err, "put /:id");
    next(err);
  }
});


CategoryRouter.post("/", async function (req, res, next) {
  try {
    const bus = new CategoryBusConc(new CategoryDalConc());
    const router = new CategoryRouterClass(bus);
    const result = await router.createOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new CategoryRouterLogger();
    logger.logError(err, "post /:id");
    next(err);
  }
});

module.exports = CategoryRouter;
