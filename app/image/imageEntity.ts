var Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

export class ImageEntity {
  _id: string = "";
  name: string = "";
  alt: string = "";
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export const ImageSchema = Joi.object({
  _id: Joi.objectId().allow(""),
  name: Joi.string(),
  alt: Joi.string(),
  createdAt: Joi.string().allow(""),
  updatedAt: Joi.string().allow("")
});



module.exports = {
  ImageEntity
};
