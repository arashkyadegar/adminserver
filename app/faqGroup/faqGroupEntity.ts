import { FaqEntity } from "../faq/faqEntity";
import { rgx_insecure } from "../utility/regexValidate";

const Joi = require("joi");
export class FaqGroupEntity {
  _id: string = "";
  name: string = "";
  display: boolean = true;
  priority: number = 0;
  faqs: Array<FaqEntity> = []
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export const FaqGroupSchema = Joi.object({
  _id: Joi.string().allow(""),
  name: Joi.string().required().regex(rgx_insecure, { invert: true }),
  display: Joi.boolean(),
  faqs: Joi.array(),
  priority: Joi.number(),
  createdAt: Joi.string().allow(""),
  updatedAt: Joi.string().allow("")
});

module.exports = {
  FaqGroupEntity,
  FaqGroupSchema
};
