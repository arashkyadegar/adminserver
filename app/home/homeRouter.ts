import express from "express";
import { HomeRouterLogger } from "../logger/homeLogger";
import { ProductWbBusConc } from "../productWeb/productWbBus";
import { ProductWbDalConc } from "../productWeb/productWbDal";
import { CategoryWbDalConc } from "../categoryWeb/categoryWbDal";
import { CategoryWbBusConc } from "../categoryWeb/categoryWbBus";
import { BrandWbDalConc } from "../brandWeb/brandWbDal";
import { BrandWbBusConc } from "../brandWeb/brandWbBus";
import { SettingWbDalConc } from "../settingWeb/settingWbDal";
import { SettingWbBusConc } from "../settingWeb/settingWbBus";

export const HomeRouter = express.Router();


HomeRouter.get("/", async function (req, res, next) {
  try {
    return res.status(200).send('this is home arashk!');
  } catch (err: any) {
    const logger = new HomeRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

HomeRouter.get("/init", async function (req, res, next) {
  try {
    const productWb_bus = new ProductWbBusConc(new ProductWbDalConc());
    const cateroyWb_bus = new CategoryWbBusConc(new CategoryWbDalConc());
    const brandWb_bus = new BrandWbBusConc(new BrandWbDalConc());
    const settingWb_bus = new SettingWbBusConc(new SettingWbDalConc());

    const settings = await settingWb_bus.findOne("1");
    let options: any = {};
    let page = 1;
    options.sort = { createdAt: -1 }
    options.categoryId = { $match: { categoryId: { $exists: true } } };

    const products = await productWb_bus.findAll(options, page);
    const brands = await brandWb_bus.findAll();
    const categories = await cateroyWb_bus.findAllGraph();
    return res.status(200).send({ settings, products, brands, categories });
  } catch (err: any) {
    const logger = new HomeRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

module.exports = HomeRouter;
