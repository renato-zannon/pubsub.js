var Message = function(publisher, raw) {
  this.publisher = publisher;
  this.raw       = raw;
};

var publicationRegex  = /^PUB (\w+)(?:\n((.*\n)*.*)\n)ENDPUB$/m;
var subscriptionRegex = /^SUB (\w+)$/;
var listRegex         = /^LIST$/;

Message.prototype = {
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

  get content() {
    if(this.isPublication()) {
      return this.raw.match(this.regex)[2];
    } else {
      return null;
    }
  },

  isInvalid: function() {
    return this.regex === null;
  },

  get channelName() {
    if(this.isInvalid() || this.isListRequest()) {
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
  },

  isListRequest: function() {
    return this.regex === listRegex;
  }
};

exports.Message = Message;
