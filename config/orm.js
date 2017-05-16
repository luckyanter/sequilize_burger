var connection = require("../config/connection.js");

function Q(num) {
  var questionArray = [];
  for (var i = 0; i < num; i++) {questionArray.push("?");}
  return questionArray.toString();
}

function format(ob) {
  var keyEqualValueObjectArray = [];
  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      keyEqualValueObjectArray.push(key + "=" + ob[key]);
    }
  }
  return keyEqualValueObjectArray.toString();
  
}
var orm = {
  all: function(tableInput, cb) { 
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {throw err;}
      cb(result);
    });
  },
  create: function(table, cols, vals, cb) {
var queryString = "INSERT INTO " + table + " (" + cols.toString() + ") " + "VALUES (" + Q(vals.length) + ") ";
    console.log(queryString);
    connection.query(queryString, vals, function(err, result) {
      if (err) {throw err;}
      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {

var queryString = "UPDATE " + table + " SET " + format(objColVals) + " WHERE " + condition
    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {throw err;}
      cb(result);
    });
  },

};

// Export the orm object for the model (burgers.js).
module.exports = orm;
