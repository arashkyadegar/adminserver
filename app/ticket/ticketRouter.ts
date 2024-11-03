import express from "express";
import { TicketRouterLogger } from "../logger/ticketLogger";
import { TicketBusConc } from "./ticketBus";
import { TicketDalConc } from "./ticketDal";
import { TicketRouterClass } from "./ticketRouterClass";


export const TicketRouter = express.Router();

TicketRouter.get("/", async function (req, res, next) {
  try {

    const bus = new TicketBusConc(new TicketDalConc());
    const router = new TicketRouterClass(bus);
    const result = await router.findAll(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new TicketRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

TicketRouter.get("/:id", async function (req, res, next) {
  try {

    const bus = new TicketBusConc(new TicketDalConc());
    const router = new TicketRouterClass(bus);
    const result = await router.findOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new TicketRouterLogger();
    logger.logError(err, "get /:id");
    next(err);
  }
});

TicketRouter.delete("/:id", async function (req, res, next) {
  try {
    const bus = new TicketBusConc(new TicketDalConc());
    const router = new TicketRouterClass(bus);
    const result = await router.deleteOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new TicketRouterLogger();
    logger.logError(err, "delete /:id");
    next(err);
  }
});

TicketRouter.post("/", async function (req, res, next) {
  try {
    const bus = new TicketBusConc(new TicketDalConc());
    const router = new TicketRouterClass(bus);
    const result = await router.createOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new TicketRouterLogger();
    logger.logError(err, "post /");
    next(err);
  }
});

TicketRouter.put("/:id", async function (req, res, next) {
  try {
    const bus = new TicketBusConc(new TicketDalConc());
    const router = new TicketRouterClass(bus);
    const result = await router.updateOne(req, res, next);
    return res.status(result.status).send(result.message);
  } catch (err: any) {
    const logger = new TicketRouterLogger();
    logger.logError(err, "put /:id");
    next(err);
  }
});
module.exports = TicketRouter;
