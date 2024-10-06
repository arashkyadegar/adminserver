import express from "express";
import { FaqRouterLogger } from "../logger/faqLogger";
import { FaqGroupBusConc } from "./faqGroupBus";
import { FaqGroupDalConc } from "./faqGroupDal";
import { FaqGroupRouterClass } from "./faqGroupRouterClass";


export const FaqGroupRouter = express.Router();

FaqGroupRouter.get("/", async function (req, res, next) {
  try {

    const bus = new FaqGroupBusConc(new FaqGroupDalConc());
    const router = new FaqGroupRouterClass(bus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FaqRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

FaqGroupRouter.get("/:id", async function (req, res, next) {
  try {

    const bus = new FaqGroupBusConc(new FaqGroupDalConc());
    const router = new FaqGroupRouterClass(bus);
    const result = await router.findOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FaqRouterLogger();
    logger.logError(err, "get /:id");
    next(err);
  }
});

FaqGroupRouter.delete("/:id", async function (req, res, next) {
  try {
    const bus = new FaqGroupBusConc(new FaqGroupDalConc());
    const router = new FaqGroupRouterClass(bus);
    const result = await router.deleteOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FaqRouterLogger();
    logger.logError(err, "delete /:id");
    next(err);
  }
});

FaqGroupRouter.post("/", async function (req, res, next) {
  try {
    const bus = new FaqGroupBusConc(new FaqGroupDalConc());
    const router = new FaqGroupRouterClass(bus);
    const result = await router.createOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FaqRouterLogger();
    logger.logError(err, "post /");
    next(err);
  }
});

FaqGroupRouter.put("/:id", async function (req, res, next) {
  try {
    const bus = new FaqGroupBusConc(new FaqGroupDalConc());
    const router = new FaqGroupRouterClass(bus);
    const result = await router.updateOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new FaqRouterLogger();
    logger.logError(err, "put /:id");
    next(err);
  }
});
module.exports = FaqGroupRouter;
