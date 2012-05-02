var Channel = function(name) {
  this.name        = name;
  this.subscribers = [];
};

var prototype = {
  publish: function(message) {
    var formattedMessage = this.name + ": " + message.content;

    this.subscribers.forEach(function(subscriber) {
      if(subscriber !== message.publisher) {
        subscriber.send(formattedMessage);
      }
    });

    return this;
  },

  addSubscriber: function(subscriber) {
    this.subscribers.push(subscriber);
  },

  hasSubscriber: function(subscriber) {
    return this.subscribers.indexOf(subscriber) > 0;
  }
};

exports.Channel = Channel;
