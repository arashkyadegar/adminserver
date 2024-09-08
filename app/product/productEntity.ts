var Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

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
     subCategories: Joi.array(),
     categoryId: Joi.objectId(),

     brand: Joi.objectId(),
     images: Joi.array(),
     shortDesc: Joi.string(),
     longdesc: Joi.string(),
     weakPoints: Joi.array(),
     strongPoints: Joi.array(),


     pageTitle: Joi.string(),
     pageLink: Joi.string(),
     desc: Joi.string(),
     keywords: Joi.array(),
     tags: Joi.array(),

     status: Joi.number(),
     size: Joi.string(),
     price: Joi.number(),
     purchasePrice: Joi.number(),
     weight: Joi.string(),
     stock: Joi.string(),
     colors: Joi.array(),

     createdAt: Joi.string().allow(""),
     updatedAt: Joi.string().allow("")
});


module.exports = {
     ProductEntity,
     ProductSchema,
};
