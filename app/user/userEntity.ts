import { Store } from "express-rate-limit";

const Joi = require("joi");


export class UserEntity {
     _id!: string;
     name!: string;
     email: string = "";
     lastName: string = "";
     firstName: string = "";

     mobile!: string;
     password !: string;
     picture!: string;
     roles: string[] = []
     createdAt!: Date;
     updatedAt!: Date;
}



export const UserSchema = Joi.object({
     _id: Joi.string().allow(""),
     name: Joi.string().allow(""),
     email: Joi.string(),


     lastName: Joi.string().allow(""),
     firstName: Joi.string().allow(""),
     mobile: Joi.string().allow(""),
     password: Joi.string().allow(""),
     picture: Joi.string().allow(""),

     roles: Joi.array(),

     createdAt: Joi.string().allow(""),
     updatedAt: Joi.string().allow("")
});

module.exports = {
     UserSchema,
     UserEntity
};
