// Arquivo "principal" do servidor. Pensado para ser usado de forma análoga ao
// método "main" do Java.
// É aqui que o Server (do arquivo udp_server.js), o Message (do message.js) e
// o Channel (channel.js) são colocados pra trabalhar juntos, fazendo emergir
// o comportamento final do sistema.

var Server  = require("./udp_server").Server;

// O objeto 'channels' é apenas um conjunto de helpers para facilitar o
// gerenciamento de vários canais. Os seus métodos ('byName' e 'toString')
// estão declarados no arquivo channels.js
var channels = require("./channels");

var SERVER_PORT = 12345;

var server = new Server("127.0.0.1", SERVER_PORT);

// Esta função é executada toda vez que o servidor emite o evento "message".
// É aqui que é feita a checagem do tipo da mensagem (pedido de listagem,
// publicação ou inscrição), e são tomadas as devidas ações (inscrever o
// cliente ao canal, publicar sua mensagem etc).

server.on("message", function(message, client) {
  if(message.isListRequest()) {
    console.log("Pedido de listagem: " + client.toString());
    client.send(channels.toString());
    return;
  }

  if(message.isInvalid()) {
    console.log("Mensagem inválida: '" + message.raw +"'");
    return;
  }

  var channel = channels.byName(message.channelName);
  if(message.isPublication()) {
    channel.publish(message);
    console.log("Publicação em '"+channel.name+"': "+message.content);
  } else if(message.isSubscription()) {
    console.log("Novo inscrito em '"+channel.name+"': "+client.toString());
    channel.addSubscriber(client);
  }
});
