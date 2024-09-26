var Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);


export class BrandEntity {
  _id: string = "";
  name: string = "";
  image: string = "";

  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}


export const BrandSchema = Joi.object({
  _id: Joi.objectId().allow(""),
  name: Joi.string(),
  image: Joi.string().allow(""),

  createdAt: Joi.string().allow(""),
  updatedAt: Joi.string().allow("")
});


module.exports = {
  BrandEntity,
  BrandSchema,
};