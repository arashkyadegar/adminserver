import express from "express";
import { ResponseStatus } from "../utility/errorStatus";
import { ImageProcessor } from "../sharp/sharp";
// import { checkAuthorize } from "../middleware/authorize";
const multer = require("multer");
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: path.resolve("./public/data/uploads"),
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }

  // destination: function (req, file, cb) {
  //   cb(null, "./public/data/uploads");
  // },
  // filename: function (req, file, cb) {
  //   cb(null, Date.now().toString() );
  // },
});

const upload = multer({ storage: storage });
export const UploadRouter = express.Router();

UploadRouter.post("/", [upload.array("files")], async function (req: any, res) {
  const result: any = [];
  const imageProcessor = new ImageProcessor();

  for (const file of req.files) {
    const image = await imageProcessor.resize(file);
    result.push({ name: image, status: false, alt: "" });
  }

  res.status(ResponseStatus.OK).send({
    files: result,
  });
}
);

UploadRouter.post("/productLogo", [upload.single("files")], function (req: any, res) {
  console.log(req.file)
  const result: any = [];
  const x = req.file;
  result.push(x.filename);
  //const fileName = validator.escape(req.file.filename);
  res.status(ResponseStatus.OK).send({
    files: result,
  });
}
);

UploadRouter.post("/upload-single", [upload.single("files")], async function (req: any, res) {
  const result: Array<string> = [];
  const imageProcessor = new ImageProcessor();
  const image = await imageProcessor.resize(req.file);

  if (image) {
    result.push(image)
  }

  res.status(ResponseStatus.OK).send({
    files: result,
  });
}
);

module.exports = UploadRouter;
