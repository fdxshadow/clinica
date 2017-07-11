// Invocar al modo JavaScript 'strict'
'use strict';

// Cargar el módulo Mongoose y el objecto Schema
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

// Definir nuevo Schema
var ProcedimientoSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    default: '',
    required: 'Debe ingresar nombre del procedimiento'
  },
  precio: {
    type: Number,
    default: 0,
    required: 'Debe ingresar el precio del procedimiento'
  }
});

mongoose.model('Procedimiento', ProcedimientoSchema);
