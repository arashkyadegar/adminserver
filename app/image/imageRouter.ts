import express from "express";
import { ImageRouterLogger } from "../logger/imageLogger";
import { ImageBusConc } from "./imageBus";
import { ImageDalConc } from "./imageDal";
import { ImageRouterClass } from "./imageRouterClass";


export const ImageRouter = express.Router();

ImageRouter.get("/", async function (req, res, next) {
  try {

    const bus = new ImageBusConc(new ImageDalConc());
    const router = new ImageRouterClass(bus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new ImageRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

ImageRouter.get("/:id", async function (req, res, next) {
  try {

    const bus = new ImageBusConc(new ImageDalConc());
    const router = new ImageRouterClass(bus);
    const result = await router.findOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new ImageRouterLogger();
    logger.logError(err, "get /:id");
    next(err);
  }
});

ImageRouter.delete("/:id", async function (req, res, next) {
  try {
    const bus = new ImageBusConc(new ImageDalConc());
    const router = new ImageRouterClass(bus);
    const result = await router.deleteOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new ImageRouterLogger();
    logger.logError(err, "delete /:id");
    next(err);
  }
});

ImageRouter.post("/multiple", async function (req, res, next) {
  try {
    const bus = new ImageBusConc(new ImageDalConc());
    const router = new ImageRouterClass(bus);
    const result = await router.createMany(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new ImageRouterLogger();
    logger.logError(err, "post /");
    next(err);
  }
});


ImageRouter.post("/", async function (req, res, next) {
  try {
    const bus = new ImageBusConc(new ImageDalConc());
    const router = new ImageRouterClass(bus);
    const result = await router.createOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new ImageRouterLogger();
    logger.logError(err, "post /");
    next(err);
  }
});







ImageRouter.put("/:id", async function (req, res, next) {
  try {
    const bus = new ImageBusConc(new ImageDalConc());
    const router = new ImageRouterClass(bus);
    const result = await router.updateOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new ImageRouterLogger();
    logger.logError(err, "put /:id");
    next(err);
  }
});
module.exports = ImageRouter;
