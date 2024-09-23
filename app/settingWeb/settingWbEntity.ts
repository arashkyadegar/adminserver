import { ImageWbEntity } from "../image/imageEntity";

const Joi = require("joi");
export class SettingEntity {
  _id: string = "1";
  slideImages: ImageWbEntity[] = [];

  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export const SettingSchema = Joi.object({
  _id: Joi.string().allow(""),
  slideImages: Joi.array(),

  createdAt: Joi.string().allow(""),
  updatedAt: Joi.string().allow("")
});
module.exports = {
  SettingEntity,
  SettingSchema
};
