var Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

export class CategoryEntity {
  _id: string = "";

  name: string = "";
  pageTitle: string = "";
  menuTitle: string = "";
  parentCategoryId: string = "";
  desc: string = "";
  keywords: string[] = [];
  upDesc: string = "";
  downDesc: string = "";
  icon: string = "";
  image: string = "";

  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export const CategorySchema = Joi.object({
  _id: Joi.objectId().allow(""),

  name: Joi.string(),
  pageTitle: Joi.string(),
  menuTitle: Joi.string(),
  parentCategoryId: Joi.string(),
  desc: Joi.string(),
  keywords: Joi.array(),
  upDesc: Joi.string(),
  downDesc: Joi.string(),
  icon: Joi.string(),
  image: Joi.string(),

  createdAt: Joi.string().allow(""),
  updatedAt: Joi.string().allow("")
});


module.exports = {
  CategoryEntity,
  CategorySchema,
};
