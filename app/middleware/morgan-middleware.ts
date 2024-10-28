import path from "path";
import morgan, { StreamOptions } from "morgan";
import { getClientData, getClientip } from "./client-ip";
var fs = require('fs');
// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
var accessLogStream = fs.createWriteStream(path.join('access.log'), { flags: 'a' })

// Skip all the Morgan http log if the 
// application is not running in development mode.
// This method is not really needed here since 
// we already told to the logger that it should print
// only warning and error messages in production.

const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};


morgan.token('client_ip', getClientip)
morgan.token('client_data', getClientData)
// Build the morgan middleware
const morganMiddleware = morgan(':client_ip :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :client_data', { stream: accessLogStream })

export default morganMiddleware;