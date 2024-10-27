import path from "path";
import { getClientip, getClientData } from "./app/middleware/client-ip";
var cors = require("cors");
var cookieParser = require("cookie-parser");
var express = require('express');
require('dotenv').config();
const bodyParser = require("body-parser");
var app = express();
const morgan = require('morgan');
var fs = require('fs')

//---- cors policy ---- //
const corsOptions = {
  origin: ['https://arashkyadegar.ir', 'http://arashkyadegar.ir',
    'https://www.arashkyadegar.ir', 'http://www.arashkyadegar.ir',
    'https://adminapp.arashkyadegar.ir',
    'http://adminapp.arashkyadegar.ir', 'http://localhost:3000'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));
//

//---- morgan logger ---- //
var accessLogStream = fs.createWriteStream(path.join('access.log'), { flags: 'a' })
morgan.token('client_ip', getClientip)
morgan.token('client_data', getClientData)
app.use(morgan(':client_ip :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :client_data', { stream: accessLogStream }))
//

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + "./public"));

app.use(express.static(path.resolve("./public")));

require("./app/routes/index")(app);
app.listen(process.env.PORT, () => {
  console.log(`server listening at port ${process.env.PORT}`);
})

module.exports = app; //uncomment for supertest run