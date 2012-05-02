var Message = function(publisher, raw) {
  this.publisher = publisher;
  this.raw       = raw;
};

var publicationRegex  = /^PUB (\w+)(?:\n((.*\n)*.*)\n)ENDPUB$/m;
var subscriptionRegex = /^SUB (\w+)$/;

Message.prototype = {
  get regex() {
    if(this._regex !== undefined) return this._regex;

    if(publicationRegex.test(this.raw)) {
      this._regex = publicationRegex;
    } else if(subscriptionRegex.test(this.raw)) {
      this._regex = subscriptionRegex;
    } else {
      this._regex = null;
    }

    return this._regex;
  },

  get content() {
    if(this.isInvalid()) {
      return null;
    } else {
      return this.raw.match(this.regex)[2];
    }
  },

  isInvalid: function() {
    return this.regex === null;
  },

  get channelName() {
    if(this.isInvalid()) {
      return null;
    } else {
      return this.raw.match(this.regex)[1];
    }
  },

  isPublication: function() {
    return this.regex === publicationRegex;
  },

  isSubscription: function() {
    return this.regex === subscriptionRegex;
  }
};

exports.Message = Message;
