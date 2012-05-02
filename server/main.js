var Server  = require("./udp_server").Server;
var _       = require("underscore");
var Channel = require("./channel").Channel;

var server = new Server();

var channels = (function() {
  var store = {};

  var nameToKey = function(name) {
    return "_channel_" + name;
  };

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

  return {
    byName: byName
  };
})();

server.on("message", function(message, client) {
  var channel = channels.byName(message.channelName);
  if(message.isPublication()) {
    channel.publish(message);
    console.log("Publication on "+channel.name+"\n: "+message.content);
  } else if(message.isSubscription()) {
    channel.addSubscriber(client);
    console.log("Subscription on "+channel.name);
  }

  // var msg = client.toString() + " connected!";
  // var notify = function(otherClient) {
  //   otherClient.send(msg);
  // };

  // _(server.clients).without(client).forEach(notify);
});

// server.on("newClient", function(client) {
//   var msg = "Welcome "+client.toString();
//   console.log(msg);
// });
