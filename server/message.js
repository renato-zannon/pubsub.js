// Representação de uma mensagem enviada por um cliente. Contém a lógica
// necessária para identificar o tipo da mensagem (publicação, inscrição etc),
// extrair o conteúdo das publicações e testar por mensagens inválidas.

// O construtor Message recebe um 'publisher' (o cliente que criou a mensagem)
// e a mensagem ainda não processada (raw)
var Message = function(publisher, raw) {
  this.publisher = publisher;
  this.raw       = raw;
};

// Expressões regulares usadas para testar pelos diferentes tipos de
// mensagens, assim como para extrair informações como o nome do canal.
var publicationRegex  = /^PUB (\w+)(?:\n((.*\n)*.*)\n)ENDPUB$/m;
var subscriptionRegex = /^SUB (\w+)$/;
var listRegex         = /^LIST$/;

Message.prototype = {

  // Na primeira execução, o getter 'regex' testa a mensagem 'crua' contra
  // cada uma das expressões regulares acima, e guarda o resultado na
  // propriedade "_regex". Em chamadas posteriores, apenas retorna-se o
  // resultado anterior.
  get regex() {
    if(this._regex !== undefined) return this._regex;

    if(publicationRegex.test(this.raw)) {
      this._regex = publicationRegex;
    } else if(subscriptionRegex.test(this.raw)) {
      this._regex = subscriptionRegex;
    } else if(listRegex.test(this.raw)) {
      this._regex = listRegex;
    } else {
      this._regex = null;
    }

    return this._regex;
  },

  // Retorna o conteúdo de publicações, e 'null' para os outros tipos de
  // mensagem (que não têm conteúdo).
  get content() {
    if(this.isPublication()) {
      return this.raw.match(this.regex)[2];
    } else {
      return null;
    }
  },

  // Se a mensagem não foi reconhecida por nenhuma das expressões regulares,
  // ela é considerada como inválida.
  isInvalid: function() {
    return this.regex === null;
  },

  // Extrai o nome do canal das mensagens de publicação e inscrição, e 'null'
  // caso a mensagem seja inválida ou de listagem (que não referencia nenhum
  // canal).
  get channelName() {
    if(this.isInvalid() || this.isListRequest()) {
      return null;
    } else {
      return this.raw.match(this.regex)[1];
    }
  },

  // Retorna 'true' caso a mensagem seja uma publicação, e 'false' caso
  // contrário.
  isPublication: function() {
    return this.regex === publicationRegex;
  },

  // Retorna 'true' caso a mensagem seja uma inscrição, e 'false' caso
  // contrário.
  isSubscription: function() {
    return this.regex === subscriptionRegex;
  },

  // Retorna 'true' caso a mensagem seja um pedido de listagem, e 'false' caso
  // contrário.
  isListRequest: function() {
    return this.regex === listRegex;
  }
};

exports.Message = Message;
