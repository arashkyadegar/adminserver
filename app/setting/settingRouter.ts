import express from "express";
import { SettingRouterLogger } from "../logger/settingLogger";
import { SettingBusConc } from "./settingBus";
import { SettingDalConc } from "./settingDal";
import { SettingRouterClass } from "./settingRouterClass";

export const SettingRouter = express.Router();
SettingRouter.get("/:id", async function (req, res, next) {
  try {
    const bus = new SettingBusConc(new SettingDalConc());
    const router = new SettingRouterClass(bus);
    const result = await router.findOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new SettingRouterLogger();
    logger.logError(err, "get /:id");
    next(err);
  }
});


SettingRouter.put("/:id", async function (req, res, next) {
  try {
    const bus = new SettingBusConc(new SettingDalConc());
    const router = new SettingRouterClass(bus);
    const result = await router.updateOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new SettingRouterLogger();
    logger.logError(err, "put /:id");
    next(err);
  }
});


module.exports = SettingRouter;
