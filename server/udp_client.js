var dgram = require('dgram');
var util  = require('util');
var Buffer = require('buffer').Buffer;
var EventEmitter = require("events").EventEmitter;

function Client(address, port) {
  this.address = address;
  this.port    = port;
  this.socket  = dgram.createSocket("udp4");

  this.socket.on("message", function(message) {
    this.emit("message", message);
  });
};

util.inherits(Client, EventEmitter);

Client.prototype.send = function(message, callback) {
  if(!(message instanceof Buffer)) {
    message = new Buffer(message);
  }
  this.socket.send(message, 0, message.length, this.port, this.address, callback);
};

Client.prototype.toString = function() {
  return util.format("%s:%d", this.address, this.port);
};

exports.Client = Client;
