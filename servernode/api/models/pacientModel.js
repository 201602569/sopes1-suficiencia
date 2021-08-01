const mongoose = require('mongoose');

var usuarioSchema = new mongoose.Schema({

  name: {
    type: String,
    required: "Please enter a name"
  },
  location: {
    type: String,
    required: "Please enter a location"
  },

  age: {
    type: Number,
    required: "Please enter a number"
  },
  gender: {
    type: String,
    required: "Please enter a number"
  },
  vaccine: {
    type: String,
    required: "Please enter a vaccine"
  }
});


var usuarios = mongoose.model('usuarios', usuarioSchema);

module.exports = usuarios;