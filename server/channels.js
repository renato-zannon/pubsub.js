// Representação de um conjunto de canais, indexados pelos seus nomes.
// Usado no arquivo main.js, para melhorar a clareza do código.

var Channel = require("./channel").Channel;

// Para não correr o risco de alguém criar um canal de nome cujo nome bata
// com métodos padrão do javascript ('hasOwnProperty' ou 'constructor', por
// exemplo), prefixamos o nome das propriedades com '_channel_'.
// No exemplo anterior, a chave para guardar o canal de nome 'constructor'
// seria '_channel_constructor', assim evitando o conflito.

var nameToKey = function(name) {
  return "_channel_" + name;
};

var store = {};

// 'byName' recebe um nome de canal ("UFABC", por exemplo), e retorna um canal
// com esse mesmo nome. Caso esse canal ainda não exista, ele é criado
// de forma transparente.
//
// Exemplo:
//
// var channel  = channels.byName("UFABC"); -> cria e retorna um canal chamado "UFABC"
// var channel2 = channels.byName("UFABC"); -> retorna o mesmo canal da chamada anterior

var byName = function(name) {
  var key = nameToKey(name);
  if(store.hasOwnProperty(key)) {
    return store[key];
  } else {
    var newChannel = new Channel(name);
    store[key] = newChannel;
    return newChannel;
  }
};

// Retorna uma representação em string de todos os canais já criados.
//
// Exemplo:
//
// var ch1 = channels.byName("UFABC");
// var ch2 = channels.byName("Lab de Redes");
//
// var str = channels.toString();
//
// 'str' agora contém as strings "UFABC" e "Lab de Redes", separadas por uma
// quebra de linha.

var toString = function() {
  var result = "";

  Object.keys(store).forEach(function(key) {
    result += store[key].name + "\n";
  });

  return result;
};

exports.byName   = byName;
exports.toString = toString;
