import express from "express";
import { ResponseStatus } from "../utility/errorStatus";
// import { checkAuthorize } from "../middleware/authorize";
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/data/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString() + ".png");
  },
});
const upload = multer({ storage: storage });
export const UploadRouter = express.Router();

UploadRouter.post(
  "/",
  [
    // checkAuthorize, 
    upload.array("files")],
  function (req: any, res) {
    const result: any = [];

    req.files.forEach((file: any) => {
      result.push({ name: file.filename, status: false, alt: "" });
    });

    res.status(ResponseStatus.OK).send({
      files: result,
    });
  }
);

UploadRouter.post(
  "/productLogo",
  [
    // checkAuthorize,
    upload.single("files")],
  function (req: any, res) {
    const result: any = [];
    const x = req.file;
    result.push(x.filename);
    //const fileName = validator.escape(req.file.filename);
    res.status(ResponseStatus.OK).send({
      files: result,
    });
  }
);

module.exports = UploadRouter;
