var Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

export class ProductWbEntity {


}

export class ExtraEntity {
     name: string = "";
     value: string = "";
}

export class ProductEntity {
     _id: string = "";
     //info
     name: string = "";
     subCategories: string[] = [];
     categoryId: string = "";
     brand: string = "";
     images: string[] = [];
     shortDesc: string = "";
     longdesc: string = "";
     weakPoints: string[] = [];
     strongPoints: string[] = [];
     extras: ExtraEntity[] = [];

     //seo
     pageTitle: string = ""
     pageLink: string = ""
     desc: string = ""
     keywords: string[] = [];
     tags: string[] = [];

     //sell
     status: number = 0;
     size: string = "";
     price: number = 0;
     purchasePrice: number = 0;
     discount: number = 0;
     weight: string = "";
     stock: string = "";
     colors: string[] = [];

     userId: string = "";

     createdAt: Date | undefined;
     updatedAt: Date | undefined;
}


export const ProductSchema = Joi.object({
     _id: Joi.objectId().allow(""),
     name: Joi.string(),
     subCategories: Joi.array().min(1).required(),
     categoryId: Joi.objectId(),

     brand: Joi.objectId().allow(""),
     images: Joi.array(),
     shortDesc: Joi.string().allow(""),
     longdesc: Joi.string().allow(""),
     weakPoints: Joi.array(),
     strongPoints: Joi.array(),
     extras: Joi.array(),

     pageTitle: Joi.string().allow(""),
     pageLink: Joi.string().allow(""),
     desc: Joi.string().allow(""),
     keywords: Joi.array(),
     tags: Joi.array(),

     status: Joi.number().allow(""),
     size: Joi.string().allow(""),
     price: Joi.number().allow(""),
     discount: Joi.number().allow(""),
     purchasePrice: Joi.number().allow(""),
     weight: Joi.string().allow(""),
     stock: Joi.string().allow(""),
     colors: Joi.array().allow(""),

     createdAt: Joi.string().allow(""),
     updatedAt: Joi.string().allow("")
});


module.exports = {
     ProductEntity,
     ProductSchema,
};