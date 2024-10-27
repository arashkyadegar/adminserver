import path from "path";
const morgan = require('morgan');
var fs = require('fs')

export const getClientip = function (req, res) {
  var client_ip;
  if (req.headers['cf-connecting-ip'] && req.headers['cf-connecting-ip'].split(', ').length) {
    var first = req.headers['cf-connecting-ip'].split(', ');
    client_ip = first[0];
  } else {
    client_ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  }
  return client_ip
};


export const getClientData = function (req, res) {

  return JSON.stringify(req.body)
};
