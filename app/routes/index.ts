var express = require("express");
const CategoryRouter = require("../category/categoryRouter");
const ProductWbRouter = require("../productWeb/productWbRouter");
const ProductRouter = require("../product/productRouter");
const HomeRouter = require("../home/homeRouter");
// const WalletItemRouter = require("../walletItem/walletItemRouter");
// const UserRouter = require("../user/userRouter");
// const CustomerRouter = require("../customer/customerRouter");
// const orderRouter = require("../order/orderRouter");
const UploadRouter = require("../upload/uploadRouter");
// const AuthRouter = require("../auth/auth");
// const StoreWebRouter =require("../storeWeb/storeWebRouter")

module.exports = function (app: any) {
     app.use('/', HomeRouter);
     app.use('/categories', CategoryRouter);
     // app.use('/storesWeb', StoreWebRouter);
     // app.use('/stores', StoreRouter);
     app.use('/products', ProductRouter);
     app.use("/api/wbproducts", ProductWbRouter);
     // app.use('/wallets', WalletRouter);
     // app.use('/walletItems', WalletItemRouter);
     // app.use('/users', UserRouter);
     app.use('/uploads', UploadRouter);
     // app.use('/customers', CustomerRouter);
     // app.use('/orders', orderRouter);
     // app.use("/api/auth", AuthRouter);
}