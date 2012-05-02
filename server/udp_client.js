var dgram = require('dgram');
var util  = require('util');
var Buffer = require('buffer').Buffer;
var EventEmitter = require("events").EventEmitter;

function Client(address, port) {
  this._address = address;
  this._port    = port;

  this.socket.on("message", function(message) {
    this.emit("message", message);
  });
};

Client.prototype = Object.create(EventEmitter.prototype, {
  "address": {
    get: function() {
      return this._address;
    },
    enumerable: true
  },

  "port": {
    get: function() {
      return this._port;
    },
    enumerable: true
  },

  "socket": {
    get: function() {
      this._socket = this._socket || dgram.createSocket("udp4");
      return this._socket;
    },
    enumerable: true
  },

  "send": {
    value: function(message, callback) {
      if(!(message instanceof Buffer)) {
        message = new Buffer(message);
      }
      this.socket.send(message, 0, message.length, this.port, this.address, callback);
    }
  },

  "toString": {
    value: function() {
      return util.format("%s:%d", this.address, this.port);
    }
  }
});

exports.Client = Client;
