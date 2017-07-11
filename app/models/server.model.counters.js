// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir nuevo Schema
var CountersSchema = new Schema({
  _id: {
    type: String,
    default: ''
  },
  seq: {
    type: Number,
    default: 0
  }
});

mongoose.model('Counters', CountersSchema);
