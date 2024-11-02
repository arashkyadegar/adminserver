var Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

export class ImageEntity {
  _id: string = "";
  name: string = "";
  title: string = "";
  alt: string = "";
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}
export class ImageListEntity {
  images: ImageEntity[] = [];
}

export const ImageListSchema = Joi.object({
  _id: Joi.objectId().allow(""),
  images: Joi.array().max(5).required(),
  createdAt: Joi.string().allow(""),
})


export const ImageSchema = Joi.object({
  _id: Joi.objectId().allow(""),
  name: Joi.string(),
  title: Joi.string(),
  alt: Joi.string(),
  createdAt: Joi.string().allow(""),
  updatedAt: Joi.string().allow("")
});



module.exports = {
  ImageEntity,
  ImageSchema,
  ImageListSchema
};
