// Representação interna (do servidor) de um cliente. Usado para encapsular
// informações (endereço, porta e socket) de um determinado cliente,
// simplificando assim o código que tem de lidar com um grande número de
// clientes.
// Uma característica digna de nota é que os "clients" emitem o evento
// "message" sempre que seu socket recebe uma mensagem. É por conta desse
// evento que todo o código de manipulação de mensagens é disparado.
var dgram = require('dgram');
var util  = require('util');
var Buffer = require('buffer').Buffer;
var EventEmitter = require("events").EventEmitter;

// Construtor da representação de cliente. Recebe o endereço e a porta para os
// quais as mensagens ao cliente devem ser enviadas.
function Client(address, port) {
  this.address = address;
  this.port    = port;
  this.socket  = dgram.createSocket("udp4");

  this.socket.on("message", function(content) {
    this.emit("message", content);
  });
};

// Clients são emissores de eventos, portanto aproveitamos a biblioteca de
// eventos do Node.js
util.inherits(Client, EventEmitter);

// Método para envio de mensagens aos clientes. Transforma o argumento
// recebido em um Buffer (exigência da API do Node.js) e o envia através do
// socket criado no construtor.
Client.prototype.send = function(content, callback) {
  if(!(content instanceof Buffer)) {
    content = new Buffer(content);
  }
  this.socket.send(content, 0, content.length, this.port, this.address, callback);
};

// Representação textual de um cliente. Usado nas mensagens de logging do
// servidor.
Client.prototype.toString = function() {
  return util.format("%s:%d", this.address, this.port);
};

exports.Client = Client;
