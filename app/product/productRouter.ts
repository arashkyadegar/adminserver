import express from "express";
import { ProductRouterLogger } from "../logger/productLogger";
import { ProductBusConc } from "./productBus";
import { ProductDalConc } from "./productDal";
import { ProductRouterClass } from "./productRouterClass";

export const ProductRouter = express.Router();



ProductRouter.get("/abbrev", async function (req, res, next) {
     try {
          const bus = new ProductBusConc(new ProductDalConc());
          const router = new ProductRouterClass(bus);
          const result = await router.findAllAbbrev(req, res, next);
          return res.status(result.status).send(result.message);
     } catch (err: any) {
          const logger = new ProductRouterLogger();
          logger.logError(err, "get /search");
          next(err);
     }
});


ProductRouter.get("/search", async function (req, res, next) {
     try {
          const bus = new ProductBusConc(new ProductDalConc());
          const router = new ProductRouterClass(bus);
          const result = await router.search(req, res, next);

          return res.status(result.status).send(result.message);
     } catch (err: any) {
          const logger = new ProductRouterLogger();
          logger.logError(err, "get /search");
          next(err);
     }
});

ProductRouter.get("/", async function (req, res, next) {
     try {
          const bus = new ProductBusConc(new ProductDalConc());
          const router = new ProductRouterClass(bus);
          const result = await router.findAll(req, res, next);
          return res.status(result.status).send(result.message);
     } catch (err: any) {
          const logger = new ProductRouterLogger();
          logger.logError(err, "get /");
          next(err);
     }
});

ProductRouter.get("/:id", async function (req, res, next) {
     try {
          const bus = new ProductBusConc(new ProductDalConc());
          const router = new ProductRouterClass(bus);
          const result = await router.findOne(req, res, next);
          return res.status(result.status).send(result.message);
     } catch (err: any) {
          const logger = new ProductRouterLogger();
          logger.logError(err, "get /:id");
          next(err);
     }
});

ProductRouter.delete("/:id", async function (req, res, next) {
     try {
          const bus = new ProductBusConc(new ProductDalConc());
          const router = new ProductRouterClass(bus);
          const result = await router.deleteOne(req, res, next);
          return res.status(result.status).send(result.message);
     } catch (err: any) {
          const logger = new ProductRouterLogger();
          logger.logError(err, "delete /:id");
          next(err);
     }
});

ProductRouter.put("/:id", async function (req, res, next) {
     try {
          const bus = new ProductBusConc(new ProductDalConc());
          const router = new ProductRouterClass(bus);
          const result = await router.updateOne(req, res, next);
          return res.status(result.status).send(result.message);
     } catch (err: any) {
          const logger = new ProductRouterLogger();
          logger.logError(err, "put /:id");
          next(err);
     }
});


ProductRouter.post("/", async function (req, res, next) {
     try {
          const bus = new ProductBusConc(new ProductDalConc());
          const router = new ProductRouterClass(bus);
          const result = await router.createOne(req, res, next);
          return res.status(result.status).send(result.message);
     } catch (err: any) {
          const logger = new ProductRouterLogger();
          logger.logError(err, "post /:id");
          next(err);
     }
});

module.exports = ProductRouter;
