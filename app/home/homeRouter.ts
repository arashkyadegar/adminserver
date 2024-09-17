import express from "express";
import { HomeRouterLogger } from "../logger/homeLogger";
// import { checkAuthorize } from "../middleware/authorize";

export const CategoryRouter = express.Router();


CategoryRouter.get("/",  async function (req, res, next) {
  try {
    return res.status(200).send('this is home arashk!');
  } catch (err: any) {
    const logger = new HomeRouterLogger();
    logger.logError(err, "get /");
    next(err);
  }
});

module.exports = CategoryRouter;
