import path from "path";
import  corsOptions  from "./app/config/cors-config";
import morganMiddleware from "./app/middleware/morgan-middleware";
var cors = require("cors");
var cookieParser = require("cookie-parser");
var express = require('express');
require('dotenv').config();
const bodyParser = require("body-parser");
var app = express();


app.use(cors(corsOptions));
app.use(morganMiddleware)
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + "./public"));

app.use(express.static(path.resolve("./public")));

require("./app/routes/index")(app);
app.listen(process.env.PORT, () => {
  console.log(`server listening at port ${process.env.PORT}`);
})

module.exports = app; //uncomment for supertest run