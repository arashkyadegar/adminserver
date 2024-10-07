import { ProductRouterClassLogger } from "../logger/productLogger";
import { ResponseStatus } from "../utility/errorStatus";
import { ProductBus } from "./productBus";
import { ProductEntity, ProductSchema } from "./productEntity";
import validator from "validator";

export class ProductRouterClass {
     bus: ProductBus;
     logger: any;
     constructor(b: ProductBus) {
          this.bus = b;
          this.logger = new ProductRouterClassLogger();
     }
     async findAllAbbrev(req, res, next): Promise<any> {


          const result = await this.bus.findAllAbbrev();
          return {
               status: ResponseStatus.OK,
               message: result,
          };

     }
     async findAll(req, res, next): Promise<any> {
          let page = 0;
          let result;
          if (req.query.page != undefined) {
               page = parseInt(req.query.page.toString());
               result = await this.bus.findAllByPages(page);
          } else {
               result = await this.bus.findAll();
          }
          return {
               status: ResponseStatus.OK,
               message: result,
          };

     }


     async search(req, res, next): Promise<any> {
          if (req.query.name) {
               const name = req.query.name
               const result = await this.bus.search(name);
               return {
                    status: ResponseStatus.OK,
                    message: result,
               };
          }
     }

     async deleteOne(req, res, next) {
          let result;
          if (req.params.id === undefined) {
               const errorResponse = `validation failed. id is not provided`;
               this.logger.logError(errorResponse, "deleteOne");
               return {
                    status: ResponseStatus.BAD_REQUEST,
                    message: errorResponse,
               };
          }

          if (!validator.isMongoId(req.params.id.toString())) {
               const errorResponse = `validation failed. id is not valid`;
               this.logger.logError(errorResponse, "deleteOne");
               return {
                    status: ResponseStatus.BAD_REQUEST,
                    message: errorResponse,
               };
          }

          let id = req.params.id;
          result = await this.bus.deleteOne(id);
          return {
               status: ResponseStatus.OK,
               message: result,
          };
     }

     async findOne(req, res, next) {
          let result;
          if (req.params.id === undefined) {
               const errorResponse = `validation failed. id is not provided`;
               this.logger.logError(errorResponse, "findOne");
               return {
                    status: ResponseStatus.BAD_REQUEST,
                    message: errorResponse,
               };
          }

          if (!validator.isMongoId(req.params.id.toString())) {
               const errorResponse = `validation failed. id is not valid`;
               this.logger.logError(errorResponse, "findOne");
               return {
                    status: ResponseStatus.BAD_REQUEST,
                    message: errorResponse,
               };
          }

          let id = req.params.id;
          result = await this.bus.findOne(id);

          if (result === undefined) {
               const errorResponse = `item not found.`;
               this.logger.logError(errorResponse, "findOne");
               return {
                    status: ResponseStatus.NOT_FOUND,
                    message: errorResponse,
               };
          }
          return {
               status: ResponseStatus.OK,
               message: result,
          };
     }

     async createOne(req, res, next): Promise<any> {
          let result;
          const productEntity = req.body as ProductEntity;
          const { error } = ProductSchema.validate(productEntity);

          if (error) {
               const errorResponse = `validation failed. errors: ${error} `;
               this.logger.logError(errorResponse, "createOne");
               return {
                    message: errorResponse,
                    status: ResponseStatus.BAD_REQUEST,
               };
          }
          result = await this.bus.createOne(productEntity);
          return {
               status: ResponseStatus.OK,
               message: result,
          };
     }


     async updateOne(req, res, next): Promise<any> {
          let result;
          let userId: string = "";

          if (req.params.id === undefined) {
               const errorResponse = `validation failed. id is not provided`;
               this.logger.logError(errorResponse, "updateOne");
               return {
                    status: ResponseStatus.BAD_REQUEST,
                    message: errorResponse,
               };
          }

          if (!validator.isMongoId(req.params.id.toString())) {
               const errorResponse = `validation failed. id is not valid`;
               this.logger.logError(errorResponse, "updateOne");
               return {
                    status: ResponseStatus.BAD_REQUEST,
                    message: errorResponse,
               };
          }

          let id = req.params.id;
          const ProductEntity = req.body as ProductEntity;
          const { error } = ProductSchema.validate(ProductEntity);
          if (error) {
               const errorResponse = `validation failed. errors: ${error} `;
               this.logger.logError(errorResponse, "updateOne");
               return {
                    message: errorResponse,
                    status: ResponseStatus.BAD_REQUEST,
               };
          }

          result = await this.bus.updateOne(id, ProductEntity);
          if (result === undefined) {
               const errorResponse = `item not found.`;
               this.logger.logError(errorResponse, "updateOne");
               return {
                    status: ResponseStatus.NOT_FOUND,
                    message: errorResponse,
               };
          }
          return {
               status: ResponseStatus.OK,
               message: result,
          };
     }
}

module.exports = { ProductRouterClass };