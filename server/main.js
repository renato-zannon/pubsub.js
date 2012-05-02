var Server  = require("./udp_server").Server;
var channels = require("./channels");

var SERVER_PORT = 12345;

var server = new Server("127.0.0.1", SERVER_PORT);

server.on("message", function(message, client) {
  if(message.isListRequest()) {
    client.send(channels.toString());
    return;
  }

  if(message.isInvalid()) {
    console.log("Invalid message: '" + message.raw +"'");
    return;
  }

  var channel = channels.byName(message.channelName);
  if(message.isPublication()) {
    channel.publish(message);
  } else if(message.isSubscription()) {
    channel.addSubscriber(client);
  }
});
