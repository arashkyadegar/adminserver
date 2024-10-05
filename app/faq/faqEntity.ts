import { rgx_insecure } from "../utility/regexValidate";

const Joi = require("joi");
export class FaqEntity {
  _id: string = "";
  groupId: number = 0;
  question: string = "";
  answer: string = "";
  display: boolean = true;
  priority: number = 0;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

export const FaqSchema = Joi.object({
  _id: Joi.string().allow(""),
  groupId: Joi.number().allow(""),
  question: Joi.string().required().regex(rgx_insecure, { invert: true }),
  answer: Joi.string().required().regex(rgx_insecure, { invert: true }),

  display: Joi.boolean(),
  priority: Joi.number(),
  date: Joi.date().timestamp().allow(""),
  
  createdAt: Joi.string().allow(""),
  updatedAt: Joi.string().allow("")
});

module.exports = {
  FaqEntity,
  FaqSchema,
};
