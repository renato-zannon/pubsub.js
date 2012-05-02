var EventEmitter = require("events").EventEmitter;

var prototype = new EventEmitter();

prototype.publish = function(message) {
  var formattedMessage = this.name + ": " + message.content;

  this.subscribers.forEach(function(subscriber) {
    if(subscriber !== message.publisher) {
      subscriber.send(formattedMessage);
    }
  });

  return this;
};

prototype.addSubscriber = function(subscriber) {
  this.subscribers.push(subscriber);
};

prototype.hasSubscriber = function(subscriber) {
  return this.subscribers.indexOf(subscriber) > 0;
};

var Channel = function(name) {
  this.name        = name;
  this.subscribers = [];
};

Channel.prototype = prototype;
exports.Channel = Channel;
