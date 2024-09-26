import express from "express";
import {CategoryWbRouterLogger } from "../logger/categoryLogger";
import { CategoryWbBusConc } from "./categoryWbBus";
import { CategoryWbDalConc } from "./categoryWbDal";
import { CategoryWbRouterClass } from "./categoryWbRouterClass";

export const CategoryWbRouter = express.Router();

CategoryWbRouter.get("/",  async function (req, res, next) {
  try {
    const bus = new CategoryWbBusConc(new CategoryWbDalConc());
    const router = new CategoryWbRouterClass(bus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new CategoryWbRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});


module.exports = CategoryWbRouter;
