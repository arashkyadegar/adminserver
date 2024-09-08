import path from "path";
var cors = require("cors");
var cookieParser = require("cookie-parser");
var express = require('express');
require('dotenv').config();
const bodyParser = require("body-parser");
var app = express();

var corsOptions = {
     //origin: "https://adminapp.liara.run",
      origin: "http://localhost:3000",
     optionsSuccessStatus: 200,
     methods: "GET, PUT, POST, DELETE",
     //preflightContinue: true,
     credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + "./public"));

app.use(express.static(path.resolve("./public")));

require("./app/routes/index")(app);
app.listen(process.env.PORT, () => {
     console.log(`server listening at port ${process.env.PORT}`);
})

module.exports = app; //uncomment for supertest run