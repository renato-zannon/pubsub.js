// Representação de um canal do servidor, onde clientes se inscrevem e de
// onde recebem publicações.

// A única informação necessária para a criação de um novo canal é seu nome.
var Channel = function(name) {
  this.name        = name;
  this.subscribers = [];
};

Channel.prototype = {
  // Adicionar um inscrito a este canal.
  addSubscriber: function(subscriber) {
    this.subscribers.push(subscriber);
  },

  // Publicação de uma Message. Usamos o método 'send' de todos os Clients
  // previamente inscritos (com exceção do client que a publicou) para enviar
  // a mensagem desejada.
  publish: function(message) {
    var formattedMessage = this.name + ": " + message.content;

    this.subscribers.forEach(function(subscriber) {
      if(subscriber !== message.publisher) {
        subscriber.send(formattedMessage);
      }
    });

    return this;
  }
};

exports.Channel = Channel;
