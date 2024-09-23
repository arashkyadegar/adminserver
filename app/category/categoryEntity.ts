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
  desc: Joi.string().allow(""),
  keywords: Joi.array(),
  upDesc: Joi.string().allow(""),
  downDesc: Joi.string().allow(""),
  icon: Joi.string().allow(""),
  image: Joi.string().allow(""),

  createdAt: Joi.string().allow(""),
  updatedAt: Joi.string().allow("")
});


module.exports = {
  CategoryEntity,
  CategorySchema,
};
