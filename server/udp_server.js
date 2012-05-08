var Client  = require('./udp_client').Client;
var Message = require("./message").Message;

var dgram = require('dgram');
var EventEmitter = require("events").EventEmitter;
var util  = require("util");

var handleNewMessage = function(buffer, rinfo) {
  var client = this.clientFor({address: rinfo.address, port: rinfo.port});

  var messageContent = buffer.toString().trim();
  var message = new Message(client, messageContent);
  this.emit("message", message, client);
};


var Server = function(address, port) {
  this.socket  = dgram.createSocket("udp4");
  this.port    = port    || 12345;
  this.address = address || "0.0.0.0";

  this.socket.bind(this.port, this.address);
  this.socket.on("message", handleNewMessage.bind(this));

  this._clients = {};
};
util.inherits(Server, EventEmitter);


Server.prototype.clientFor = function(rinfo) {
  var key = "__" + JSON.stringify(rinfo);

  var client;
  if(this._clients.hasOwnProperty(key)) {
    client = this._clients[key];
  } else {
    client = this._clients[key] = new Client(rinfo.address, rinfo.port);
  }

  return client;
};


exports.Server = Server;
