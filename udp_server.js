var Client  = require('./udp_client').Client;
var Message = require("./message").Message;

var _     = require('underscore');
var dgram = require('dgram');

var handleNewMessage = function(buffer, rinfo) {
  var client = this.clientFor({address: rinfo.address, port: rinfo.port});

  if(!_.include(this.clients, client)) {
    this.clients.push(client);
    this.emit("newClient", client);
  }

  var messageContent = buffer.toString().trim();
  var message = new Message(client, messageContent);
  this.emit("message", message, client);
};

var Server = function(address, port) {
  this.port    = port    || 12345;
  this.address = address || "0.0.0.0";
  this.clients = [];

  this.socket.bind(this.port, this.address);
  this.socket.on("message", handleNewMessage.bind(this));
};

Server.prototype = {
  get socket() {
    this._socket = this._socket || dgram.createSocket("udp4");
    return this._socket;
  },

  clientFor: _.memoize(function(rinfo) {
    return new Client(rinfo.address, rinfo.port);
  }, JSON.stringify)
};
var EventEmitter = require("events").EventEmitter;
_.extend(Server.prototype, EventEmitter.prototype);

exports.Server = Server;
