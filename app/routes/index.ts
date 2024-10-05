var express = require("express");
const BrandWbRouter = require("../brandWeb/brandWbRouter");
const BrandRouter = require("../brand/brandRouter");
const CategoryRouter = require("../category/categoryRouter");
const CategoryWbRouter = require("../categoryWeb/categoryWbRouter");
const ProductWbRouter = require("../productWeb/productWbRouter");
const ProductRouter = require("../product/productRouter");
const HomeRouter = require("../home/homeRouter");
const UploadRouter = require("../upload/uploadRouter");
const SettingRouter = require("../setting/settingRouter");
const SettingWbRouter = require("../settingWeb/settingWbRouter");
const FaqRouter = require("../faq/faqRouter");
const FaqWbRouter = require("../faqWeb/faqWbRouter");

module.exports = function (app: any) {
     app.use('/', HomeRouter);
     app.use('/categories', CategoryRouter);
     app.use('/brands', BrandRouter);
     app.use('/api/wbbrands', BrandWbRouter);
     app.use('/api/wbcategories', CategoryWbRouter);
     app.use("/api/wbproducts", ProductWbRouter);
     app.use('/products', ProductRouter);
     app.use('/uploads', UploadRouter);
     app.use('/settings', SettingRouter);
     app.use('/api/wbsettings', SettingWbRouter);
     app.use('/faqs', FaqRouter);
     app.use('/api/wbfaqs', FaqWbRouter);

}