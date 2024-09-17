import { ImageWbEntity } from "../image/imageEntity";

const Joi = require("joi");
export class SettingEntity {
  _id: string = "1";
  slideImages: ImageWbEntity[] = [];
}

export const SettingSchema = Joi.object({
  _id: Joi.string(),
  slideImages: Joi.array()
});
module.exports = {
  SettingEntity,
  SettingSchema
};
