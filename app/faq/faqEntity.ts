import { rgx_insecure } from "../utility/regexValidate";

const Joi = require("joi");
export class FaqEntity {
  _id: string = "";
  groupId: string = "";
  question: string = "";
  answer: string = "";
  display: boolean = true;
  priority: number = 0;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export const FaqSchema = Joi.object({
  _id: Joi.string().allow(""),
  groupId: Joi.string().allow(""),
  question: Joi.string().required().regex(rgx_insecure, { invert: true }),
  answer: Joi.string().required().regex(rgx_insecure, { invert: true }),

  display: Joi.boolean(),
  priority: Joi.number(),

  
  createdAt: Joi.string().allow(""),
  updatedAt: Joi.string().allow("")
});

module.exports = {
  FaqEntity,
  FaqSchema,
};
