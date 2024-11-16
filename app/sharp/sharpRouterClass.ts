import express from "express";
import { CompositEntity, ResizeEntity } from "./sharpEntity";
import { ImageProcessor } from "./sharp";
import { ImageBusConc } from "../image/imageBus";
import { ImageDalConc } from "../image/imageDal";
import { ImageEntity } from "../image/imageEntity";
export const SharpRouter = express.Router();

SharpRouter.post("/composit", async function (req, res, next) {
  try {
    const compositInput = req.body as CompositEntity;
    const imageProcessor = new ImageProcessor();
    const filename = Date.now().toString();
    const result = await imageProcessor.compositeImages(compositInput.baseImage, compositInput.extraImage, filename);
    return res.status(200).send({ 'type': 'composit', 'result': result });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
});


SharpRouter.post("/addtext", async function (req, res, next) {
  try {
    const compositInput = req.body as CompositEntity;
    const filename = Date.now().toString();
    const imageProcessor = new ImageProcessor();
    const text_image = await imageProcessor.addTextOnImage(filename);
    const result = await imageProcessor.compositeImages(compositInput.baseImage, text_image, filename);

    return res.status(200).send({ 'type': 'addText', 'result': result });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
});


SharpRouter.post("/resizebyname", async function (req, res, next) {
  try {
    const bus = new ImageBusConc(new ImageDalConc());
    const resizeInput = req.body as ResizeEntity;
    const imageProcessor = new ImageProcessor();
    const resized_image = await imageProcessor.resizeImageByName(resizeInput.baseImage)
    const image = new ImageEntity();
    image.name = resized_image;
    const result = await bus.createOne(image);
    return res.status(200).send({ 'type': 'resizebyname', 'result': result });
  } catch (err: any) {
    console.log(err);
    next(err);
  }
});

module.exports = SharpRouter;
