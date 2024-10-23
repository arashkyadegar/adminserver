import path from "path";
var cors = require("cors");
var cookieParser = require("cookie-parser");
var express = require('express');
require('dotenv').config();
const bodyParser = require("body-parser");
var app = express();

//////////////////


const corsOptions = {
  origin: ['https://arashkyadegar.ir','https://adminapp.arashkyadegar.ir','http://localhost:3000'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200 // For legacy browser support
};


app.use(cors(corsOptions));

////////////////////

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + "./public"));

app.use(express.static(path.resolve("./public")));

require("./app/routes/index")(app);
app.listen(process.env.PORT, () => {
  console.log(`server listening at port ${process.env.PORT}`);
})

module.exports = app; //uncomment for supertest run