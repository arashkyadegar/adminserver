import express from "express";
import { SettingRouterLogger } from "../logger/settingLogger";
import { SettingWbBusConc } from "./settingWbBus";
import { SettingWbDalConc } from "./settingWbDal";
import { SettingRouterClass } from "./settingWbRouterClass";

export const SettingWbRouter = express.Router();
SettingWbRouter.get("/:id", async function (req, res, next) {
  try {
    const bus = new SettingWbBusConc(new SettingWbDalConc());
    const router = new SettingRouterClass(bus);
    const result = await router.findOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new SettingRouterLogger();
    logger.logError(err, "get /:id");
    next(err);
  }
});


module.exports = SettingWbRouter;
