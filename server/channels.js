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

var toString = function() {
  var result = "";

  Object.keys(store).forEach(function(key) {
    result += store[key].name + "\n";
  });

  return result;
};

exports.byName   = byName;
exports.toString = toString;
