var EventEmitter = require("events").EventEmitter;
var _ = require("underscore");

var formatMessage = function(spec) {
  var messsageTemplate = "<%= publisher %>@<%= channel %>: <%= message %>";
  var compiledTemplate = _.template(messsageTemplate);

  formatMessage = function(spec) {
    return compiledTemplate.call(null, spec);
  };

  return formatMessage(spec);
};

var prototype = new EventEmitter();

prototype.publish = function(message) {
  var formattedMessage = formatMessage({
    channel:   this.name,
    publisher: message.publisher,
    message:   message.text
  });

  this.subscribers.forEach(function(subscriber) {
    subscriber.send(formattedMessage);
  });

  return this;
};

prototype.addSubscriber = function(subscriber) {
  this.subscribers.push(subscriber);
};

var Channel = function(name) {
  this.name        = name;
  this.subscribers = [];
};

Channel.prototype = prototype;
exports.Channel = Channel;
