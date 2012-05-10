// O Server é o objeto que faz interface da aplicação com a maior parte da
// lógica UDP envolvida. Para isso, usa diretamente a API do Node.js
// ("dgram"), e expõe uma interface mais simples, para ser usada pelo resto da
// aplicação.
var dgram = require('dgram');
var EventEmitter = require("events").EventEmitter;
var util  = require("util");

var Client  = require('./udp_client').Client;
var Message = require("./message").Message;

// Função utilitária usada para a manipulação de mensagens recebidas. É
// atribuição dela buscar (ou instanciar) o Client associado ao endereço e
// porta da mensagem, instanciar uma Message usando o conteúdo da mensagem e
// emitir o evento "message", que é usado no main.js.
var handleNewMessage = function(buffer, rinfo) {
  var client = this.clientFor({address: rinfo.address, port: rinfo.port});

  var messageContent = buffer.toString().trim();
  var message = new Message(client, messageContent);
  this.emit("message", message, client);
};

// O construtor de Server pede um endereço e uma porta, para que possa
// vincular o socket UDP.
var Server = function(address, port) {
  this.socket  = dgram.createSocket("udp4");
  this.port    = port;
  this.address = address;

  this.socket.bind(this.port, this.address);
  this.socket.on("message", handleNewMessage.bind(this));

  this._clients = {};
};

// Servers são emissores de eventos.
util.inherits(Server, EventEmitter);

// Dado um objeto rinfo (Request information) que foi entregado pelo Node.js,
// a função clientFor retorna uma nova instância de Client (caso o cliente
// nunca tenha se conectado) ou uma instância existente (caso o cliente
// já tenha enviado alguma mensagem anteriormente), usando como chave de
// unicidade a combinação endereço + porta.
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
