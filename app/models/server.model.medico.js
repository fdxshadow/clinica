// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir nuevo Schema
var MedicoSchema = new Schema({
  run: {
    type: String,
    trim: true,
    required: 'Debe ingresar RUN del medico'
  },
  nombre: {
    type: String,
    trim: true,
    required: 'Debe ingresar nombre del medico'
  },
  especialidad: {
    type: String,
    trim: true,
    default: ''
  }
});

mongoose.model('Medico', MedicoSchema);
