const winston = require('winston');
const { format } = require('logform');
const { combine, timestamp, label, printf } = format;

export  class WinstonLogger  {
  module = "";
  method = "";

  constructor(_module: string){

    this.module = _module;
  }

  getLogger(method: string){
  const { createLogger, format, transports } = require('winston');
  const { combine, timestamp, label, printf } = format;
  const myFormat = printf(({ level , message, timestamp }) => {
    return `${timestamp} ${this.module} ${method} ${level}: ${message}`;
  });
  
    const logger = createLogger({
    format: combine(
      label({ label: 'right meow!' }),
      timestamp(),
      myFormat
    ),
    transports: [new transports.Console(),
      new winston.transports.File({ filename: 'error.log', level: 'error' })]
  });

    return logger;
  }
}

module.exports = {
  WinstonLogger
}
