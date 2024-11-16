import express from "express";
import { UserRouterLogger } from "../logger/userLogger";
import { UserBusConc } from "./userBus";
import { UserDalConc } from "./userDal";
import { UserRouterClass } from "./userRouterClass";


export const UserRouter = express.Router();

UserRouter.get("/", async function (req, res, next) {
  try {

    const bus = new UserBusConc(new UserDalConc());
    const router = new UserRouterClass(bus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new UserRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

UserRouter.get("/:id", async function (req, res, next) {
  try {

    const bus = new UserBusConc(new UserDalConc());
    const router = new UserRouterClass(bus);
    const result = await router.findOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new UserRouterLogger();
    logger.logError(err, "get /:id");
    next(err);
  }
});

UserRouter.delete("/:id", async function (req, res, next) {
  try {
    const bus = new UserBusConc(new UserDalConc());
    const router = new UserRouterClass(bus);
    const result = await router.deleteOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new UserRouterLogger();
    logger.logError(err, "delete /:id");
    next(err);
  }
});

UserRouter.post("/", async function (req, res, next) {
  try {
    const bus = new UserBusConc(new UserDalConc());
    const router = new UserRouterClass(bus);
    const result = await router.createOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new UserRouterLogger();
    logger.logError(err, "post /");
    next(err);
  }
});

UserRouter.put("/:id", async function (req, res, next) {
  try {
    const bus = new UserBusConc(new UserDalConc());
    const router = new UserRouterClass(bus);
    const result = await router.updateOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new UserRouterLogger();
    logger.logError(err, "put /:id");
    next(err);
  }
});
module.exports = UserRouter;
