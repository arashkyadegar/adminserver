var Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

export class CompositEntity {
  _id: string = "";
  baseImage: string = "";
  extraImage: string = "";
}


export class ResizeEntity {
  _id: string = "";
  baseImage: string = "";
}

export const CompositSchema = Joi.object({
  _id: Joi.objectId().allow(""),
  baseImage: Joi.string(),
  extraImage: Joi.string()
})


// export const ImageSchema = Joi.object({
//   _id: Joi.objectId().allow(""),
//   name: Joi.string(),
//   title: Joi.string(),
//   alt: Joi.string(),
//   createdAt: Joi.string().allow(""),
//   updatedAt: Joi.string().allow("")
// });



module.exports = {
  CompositEntity,
  ResizeEntity,
  CompositSchema
};
