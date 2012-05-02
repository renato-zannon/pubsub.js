var Channel = require("./channel").Channel;

var nameToKey = function(name) {
  return "_channel_" + name;
};

var store = {};

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

exports.byName = byName;
