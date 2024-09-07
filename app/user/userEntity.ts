import { Store } from "express-rate-limit";

const Joi = require("joi");
export class IUser {
     _id!: string;
     username!: string;
     password!: string;
     store!: Store;
     createdAt!: Date;
     updatedAt!: Date;
}

export class UserEntity extends IUser { }
export class UserWbEntity extends IUser { }

export const UserSchema = Joi.object({
     _id: Joi.string().allow(""),
     username: Joi.string().min(5),
     password: Joi.string().min(5),
     store: Joi.object(),
     createdAt: Joi.string().allow(""),
     updatedAt: Joi.string().allow("")
});

module.exports = {
     UserSchema,
     UserEntity,
     UserWbEntity,
};
